const fs = require('fs');
const path = require('path');

const xmlPath = path.join(__dirname, '../public/data/knowledge-info.xml');

if (!fs.existsSync(xmlPath)) {
  console.log('✅ knowledge-info.xml 파일이 존재하지 않습니다. 검증을 건너뜁니다.');
  process.exit(0);
}

const xmlContent = fs.readFileSync(xmlPath, 'utf-8');

// 기본 XML 구조 검증 (정규식 기반 간단 검증)
if (!xmlContent.includes('<?xml')) {
  console.error('❌ 에러: XML 선언문(<?xml ... ?>)이 누락되었습니다.');
  process.exit(1);
}

if (!xmlContent.includes('<knowledge-info-list>') || !xmlContent.includes('</knowledge-info-list>')) {
  console.error('❌ 에러: 최상위 태그 <knowledge-info-list>가 누락되었거나 올바르지 않습니다.');
  process.exit(1);
}

const items = xmlContent.match(/<item>[\s\S]*?<\/item>/g) || [];

console.log(`🔍 총 ${items.length}개의 지식정보 아이템이 발견되었습니다.`);

let hasError = false;

items.forEach((item, index) => {
  const requiredTags = ['id', 'siteName', 'url', 'title'];
  
  requiredTags.forEach(tag => {
    const regex = new RegExp(`<${tag}>(.*?)<\/${tag}>`);
    const match = item.match(regex);
    
    if (!match || !match[1].trim()) {
      console.error(`❌ 에러: ${index + 1}번째 아이템에 필수 태그 <${tag}>가 누락되었거나 값이 비어 있습니다.`);
      hasError = true;
    }
  });
});

if (hasError) {
  console.error('💥 XML 검증에 실패했습니다. 파일을 확인해주세요.');
  process.exit(1);
} else {
  console.log('✅ XML 검증을 성공적으로 통과했습니다!');
}
