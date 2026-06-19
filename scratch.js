const projectsData = [
  // 2021
  { id: "golden-tree", year: 2021, name: "골든트리 (GOLDEN TREE)", location: "가평군 경기도", coordinates: [37.7538, 127.5309], plusCode: "QG4Q+5J", category: "F&B", link: "https://identio.kr/goldentree", image: "img/golden-tree.jpg" },
  { id: "po-oak", year: 2021, name: "포옥 (Po.oak)", location: "포천시 경기도", coordinates: [37.8488, 127.1895], plusCode: "Q5F8+W8", category: "F&B", link: "https://identio.kr/pooak", image: "img/po-oak.jpg" },
  { id: "tridot", year: 2021, name: "트라이닷 (TRIDOT)", category: "Retail" },
  { id: "rich-teach", year: 2021, name: "리치티치 (Rich Teach)", category: "Education" },
  { id: "brunk", year: 2021, name: "브렁크 (Brunk)", category: "Fashion" },
  
  // 2022
  { id: "trivium", year: 2022, name: "트리비움 (IIIVIUM)", location: "평택시 경기도", coordinates: [37.0427, 127.0673], plusCode: "44R9+FM", category: "Complex", link: "https://identio.kr/trivium", image: "img/trivium.jpg" },
  { id: "hotel-aank", year: 2022, name: "호텔 아늑 (HOTEL AANK)", location: "대전광역시", coordinates: [36.3504, 127.3845], plusCode: "983W+R2", category: "Hospitality", link: "https://identio.kr/hotelannk", image: "img/hotel-aank.jpg" },
  { id: "the-hoosik", year: 2022, name: "더휴식 (THE HOOSIK)", category: "Hospitality" },
  { id: "obov", year: 2022, name: "오비오브 (obov)", category: "F&B" },
  { id: "brand-new-machinery", year: 2022, name: "브랜뉴 머시너리 (brand-new machinery)", location: "화성시 경기도", coordinates: [37.2005, 126.9748], plusCode: "6M9X+85", category: "Factory", link: "https://identio.kr/brandnewmachinery", image: "img/bnm.jpg" },
  { id: "jingun", year: 2022, name: "진건종합건설 (JINGUN Constructure)", location: "서울특별시", coordinates: [37.5665, 126.9780], plusCode: "G22R+68", category: "Construction", image: "img/jingun.jpg" },
  { id: "woobon", year: 2022, name: "우본개발 주식회사 (WOOBON)", location: "서울특별시", coordinates: [37.5600, 126.9700], plusCode: "F2Q7+4P", category: "Landscape Architecture", image: "img/woobon.jpg" },
  { id: "high-street-italia", year: 2022, name: "하이 스트리트 이탈리아 (HIGH STREET ITALIA)", category: "Retail" },
  { id: "po-oak-seasonal", year: 2022, name: "포옥 시즌널 그래픽 (Po.oak Seasonal Graphic)", category: "Seasonal Graphics" },
  { id: "cdc", year: 2022, name: "죽전 데이터센터 (CDC)", category: "Naming" },
  { id: "meongsan", year: 2022, name: "(주)명산 (Meongsan)", category: "Landscape Architecture" },
  { id: "bulls-nft", year: 2022, name: "불스 NFT (BULLS NFT)", category: "Graphic" },
  
  // 2023
  { id: "fogmag", year: 2023, name: "포그막 (fogmag)", location: "대구광역시", coordinates: [35.7725, 128.4357], plusCode: "PCHM+2R", category: "F&B", link: "https://identio.kr/fogmag", image: "img/fogmag.jpg" },
  { id: "dalseong-jujo", year: 2023, name: "달성주조 (DALSEONG JUJO)", location: "대구광역시", coordinates: [35.7725, 128.4357], plusCode: "PCHM+2R", category: "F&B", link: "https://identio.kr/dalseong", image: "img/dalseong-jujo.jpg" },
  { id: "shltr", year: 2023, name: "셜터 (SHLTR)", location: "속초시 강원특별자치도", coordinates: [38.2046, 128.5912], plusCode: "5HXW+2W", category: "F&B", link: "https://identio.kr/shltr", image: "img/shltr.jpg" },
  { id: "hotel-simjak", year: 2023, name: "호텔 심작 (HOTEL SIMJAK)", location: "화성시 경기도", coordinates: [37.1995, 126.8315], plusCode: "639H+6C", category: "Hospitality", link: "https://identio.kr/hotelsimjak", image: "img/hotel-simjak.jpg" },
  { id: "tennis-land", year: 2023, name: "테니스랜드 (TENNIS LAND)", location: "창원시 경상남도", coordinates: [35.2281, 128.6811], plusCode: "6M9Q+HR", category: "Sports", link: "https://identio.kr/tennisland1", image: "img/tennis-land.jpg" },
  { id: "mozaiq", year: 2023, name: "모자이크 (MOZAIQ)", category: "Hospitality", link: "https://identio.kr/mozaiq", image: "img/mozaiq.jpg" },
  { id: "project-seoul", year: 2023, name: "프로젝트 서울 (PROJECT SEOUL)", category: "Exhibition" },
  
  // 2024
  { id: "pando", year: 2024, name: "판도 (PANDO)", location: "화성시 경기도", coordinates: [37.2039, 126.9578], plusCode: "5483+QH", category: "F&B", link: "https://identio.kr/pando", image: "img/pando.jpg" },
  { id: "deffo", year: 2024, name: "데포 (DEFFO)", category: "Fashion" },
  { id: "recover-fitness", year: 2024, name: "리커버 (RECOVER FITNESS)", location: "서울특별시", coordinates: [37.5665, 126.9780], plusCode: "F4VC+JW", category: "Sports", link: "https://identio.kr/RECOVER", image: "img/recover-fitness.jpg" },
  { id: "acorn", year: 2024, name: "에이콘 (ACORN)", category: "F&B" },
  { id: "qdo", year: 2024, name: "큐디오 (QDO)", category: "Cultural Complex" },
  { id: "scenic", year: 2024, name: "시닉 (SCENIC)", category: "Landscape Architecture" },
  { id: "mfeo", year: 2024, name: "엠페오 (MFEO)", category: "Landscape Architecture", link: "https://identio.kr/mfeo", image: "img/mfeo.jpg" },
  { id: "tourputt", year: 2024, name: "투어펏 (TOURPUTT)", category: "Golf" },
  { id: "golden-tree-seasonal", year: 2024, name: "골든트리 시즌널 그래픽 (GOLDEN TREE Seasonal Graphic)", location: "가평군 경기도", coordinates: [37.7538, 127.5309], plusCode: "QG4Q+5J", category: "Seasonal Graphics", image: "img/golden-tree-seasonal-graphic.jpg" },
  { id: "omshanti", year: 2024, name: "옴샨티 (OMSHANTI)", location: "창원시 경상남도", coordinates: [35.2150, 128.6750], plusCode: "6MQJ+V4", category: "Fragrance", link: "https://identio.kr/omshanti", image: "img/omshanti.jpg" },
  { id: "inibio", year: 2024, name: "이니바이오 (IniBio)", location: "부천시 경기도", coordinates: [37.5000, 126.7600], plusCode: "GQH6+9G", category: "Healthcare", image: "img/inibio.jpg" },
  { id: "weus", year: 2024, name: "위어스 (weus)", location: "창원시 경상남도", coordinates: [35.2280, 128.6810], plusCode: "6M8R+MR", category: "Sports", image: "img/weus.jpg" },
  
  // 2025
  { id: "nestle-health-store", year: 2025, name: "네슬레 헬스 사이언스 스토어 (Nestle Health Science Store)", location: "서울특별시", coordinates: [37.5200, 127.0200], plusCode: "GVGG+H3", category: "Healthcare", link: "https://identio.kr/works", image: "img/nestle.jpg" },
  { id: "fogmag-package", year: 2025, name: "포그막 패키지 (fogmag Package)", category: "F&B", link: "https://identio.kr/fogmag_2025" },
  { id: "lotte-ohwa", year: 2025, name: "롯데 오화 (Lotte OHWA)", category: "F&B" },
  { id: "lemaha", year: 2025, name: "르마하 (Lémaha)", location: "서울특별시", coordinates: [37.5186, 127.0210], plusCode: "GXFW+QC", category: "Beauty", link: "https://identio.kr/lemaha", image: "img/lemaha.jpg" },
  { id: "cov-entertainment", year: 2025, name: "코브엔터 (COV Entertainment)", location: "서울특별시", coordinates: [37.5400, 127.0400], plusCode: "F3P8+54", category: "Sports", link: "https://identio.kr/cov", image: "img/cov.jpg" },
  { id: "league-seoul", year: 2025, name: "리그서울 (League Seoul)", category: "Sports" },
  { id: "tp-tower-signage", year: 2025, name: "TP타워 사이니지 (TP TOWER Signage)", location: "서울특별시", coordinates: [37.5218, 126.9242], plusCode: "GWCF+G6", category: "Signage Design" },
  { id: "le-salon", year: 2025, name: "르살롱 (LE SALON)", location: "성남시 경기도", coordinates: [37.3917, 127.1118], plusCode: "94P7+6V", category: "Landscape Architecture", link: "https://identio.kr/lesalon", image: "img/le-salon.jpg" },
  { id: "posi", year: 2025, name: "포시 (Posi)", category: "Healthcare" },
  { id: "nuwa-clinic", year: 2025, name: "너와의원 (NUWA CLINIC)", location: "서울특별시", coordinates: [37.5412, 127.0435], plusCode: "F2WH+R2", category: "Healthcare", link: "https://identio.kr/nuwaclinic", image: "img/nuwa-clinic.jpg" },
  { id: "deli-mart", year: 2025, name: "델리마트 (Deli Mart)", location: "아산시 충청남도", coordinates: [36.7898, 127.0024], plusCode: "Q3R8+FH", category: "Grocery Retail", link: "https://identio.kr/delimart", image: "img/deli-mart.jpg" },
  
  // 2026
  { id: "wilson-homecourt", year: 2026, name: "윌슨 홈코트 시리즈 (Wilson Homecourt Series)", location: "구리시 경기도", coordinates: [37.6026, 127.1432], plusCode: "H489+P3", category: "Sports", link: "https://identio.kr/whs", image: "img/whs.jpg" },
  { id: "giun-sangja", year: 2026, name: "기운상자 (GIUN SANGJA)", location: "창원시 경상남도", coordinates: [35.2255, 128.6820], plusCode: "4G2X+H7", category: "F&B", image: "img/giunsangja.jpg" },
  { id: "chungkiwa-garden", year: 2026, name: "청기와가든 (Chungkiwa Garden)", location: "서울특별시", coordinates: [37.5562, 126.9227], plusCode: "GWFG+JC", category: "Restaurant" },
  { id: "soryo", year: 2026, name: "소료 (SORYO)", location: "서울특별시", coordinates: [37.5000, 127.0000], plusCode: "JWF9+CP", category: "Ceramics", image: "img/soryo.jpg" },
  { id: "lemaha-package", year: 2026, name: "르마하 패키지 (Lémaha Package)", category: "Beauty" },
  { id: "gtws", year: 2026, name: "GTWS (Golden Trail World Series)", location: "무주군 전북특별자치도", coordinates: [36.0071, 127.6606], plusCode: "VP5W+XG", category: "Sports" },
  { id: "deli-food", year: 2026, name: "델리푸드 (Deli Food)", category: "F&B Retail" },
  { id: "jinju-observatory", year: 2026, name: "진주 전망대 (Jinju Observatory)", location: "진주시 경상남도", coordinates: [35.1802, 128.0847], plusCode: "53GG+8J", category: "Cultural Complex" },
  { id: "kia-eeum-flatflat", year: 2026, name: "기아 이음 플랫플랫 (Kia eeum flatflat)", category: "F&B" }
];
