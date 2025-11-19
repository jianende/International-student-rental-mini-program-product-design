
import { City, Listing } from './types';

export const CITIES: City[] = [
  { id: 'la', name: '洛杉矶', image: 'https://images.unsplash.com/photo-1580655653885-65763b2597d0?auto=format&fit=crop&w=400&q=80', hot: true },
  { id: 'nyc', name: '纽约', image: 'https://images.unsplash.com/photo-1499092346589-b9b6be3e94b2?auto=format&fit=crop&w=400&q=80', hot: true },
  { id: 'tor', name: '多伦多', image: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400&q=80', hot: true },
  { id: 'bos', name: '波士顿', image: 'https://images.unsplash.com/photo-1505487531286-3d23d7c1503c?auto=format&fit=crop&w=400&q=80' },
  { id: 'lon', name: '伦敦', image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=400&q=80' },
];

export const LISTINGS: Listing[] = [
  {
    id: '1',
    title: 'Lorenzo Premium Student Housing',
    cityId: 'la',
    price: 1850,
    currency: '$',
    tags: ['拎包入住', '全包价', '近USC'],
    image: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=800&q=80',
    images: [
        'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=800&q=80', 
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&w=800&q=80'
    ],
    distanceToSchool: '步行 10 分钟至 USC',
    type: '2B2B Shared',
    sqft: 850,
    description: 'USC留学生首选，高端公寓，包含全套家具，水电网全包。24小时安保，拥有4个度假式泳池。',
    amenities: ['含家具', '水电网全包', '24H安保', '健身房', '泳池', '自习室'],
    location: { lat: 34.0224, lng: -118.2851 },
    s1Benefits: ['24/7 专属管家', '报修4小时响应', '无中介费'],
    status: 'low_stock',
    stockCount: 3,
    leaseTerms: ['12个月 (Aug 2025起)', 'Semester (Fall Only)'],
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    vrUrl: 'https://my.matterport.com/show/?m=example', // Mock VR URL
    securityFeatures: ['24小时持枪安保', '全封闭社区', '人脸识别门禁', '夜间巡逻'],
    safetyRating: 5,
    commuteTimes: [
        { label: 'USC Campus', duration: '10 min', type: 'walk', destination: 'University of Southern California' },
        { label: 'Jefferson/USC Metro', duration: '5 min', type: 'walk', destination: 'Metro Station' },
        { label: 'Ralphs Grocery', duration: '15 min', type: 'walk', destination: 'Supermarket' }
    ]
  },
  {
    id: '2',
    title: 'Element 30 Apartments',
    cityId: 'la',
    price: 2200,
    currency: '$',
    tags: ['拎包入住', '独卫', '全包价'],
    image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80',
    images: [
        'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80', 
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=800&q=80'
    ],
    distanceToSchool: '骑行 5 分钟至 USC',
    type: 'Studio',
    sqft: 450,
    description: '现代风格装修，独享私人空间。全包服务，每月定期保洁。',
    amenities: ['独立卫浴', '定期保洁', '包裹代收', '高速WiFi'],
    location: { lat: 34.0324, lng: -118.2851 },
    s1Benefits: ['无隐形消费', '中文服务', '新生接机'],
    status: 'available',
    stockCount: 12,
    leaseTerms: ['12个月', 'Spring 2025'],
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    securityFeatures: ['智能门锁', 'CCTV监控', '前台安保'],
    safetyRating: 4.5,
    commuteTimes: [
        { label: 'USC Village', duration: '5 min', type: 'drive', destination: 'Shopping Center' },
        { label: 'USC Campus', duration: '8 min', type: 'transit', destination: 'Campus' }
    ]
  },
  {
    id: '3',
    title: 'Skyline Tower LIC',
    cityId: 'nyc',
    price: 2600,
    currency: '$',
    tags: ['曼哈顿景', '全包价', '地铁直达'],
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80',
    images: [
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80', 
        'https://images.unsplash.com/photo-1484154218962-a1c00207099b?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80'
    ],
    distanceToSchool: '地铁 15 分钟至 NYU',
    type: '1B1B',
    sqft: 600,
    description: '长岛市地标建筑，俯瞰曼哈顿天际线。极致奢华体验，拎包入住。',
    amenities: ['天际泳池', '私人影院', '宠物友好', '洗烘一体'],
    location: { lat: 40.7447, lng: -73.9485 },
    s1Benefits: ['大楼VIP通道', '专属活动', '租金月付'],
    status: 'sold_out',
    stockCount: 0,
    leaseTerms: ['12个月'],
    vrUrl: 'https://my.matterport.com/show/?m=example2',
    securityFeatures: ['24小时Doorman', '电梯梯控', '可视对讲'],
    safetyRating: 5,
    commuteTimes: [
        { label: 'NYU Midtown', duration: '15 min', type: 'transit', destination: 'Campus' },
        { label: 'Court Sq Station', duration: '2 min', type: 'walk', destination: 'Subway' }
    ]
  },
  {
    id: '4',
    title: 'University Plaza',
    cityId: 'tor',
    price: 1400,
    currency: 'C$',
    tags: ['近多大', '高性价比', '全包价'],
    image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80',
    images: [
        'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80', 
        'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80'
    ],
    distanceToSchool: '步行 3 分钟至 UofT',
    type: '3B2B Shared',
    sqft: 1100,
    description: '多伦多大学核心生活圈，下楼即是校园。高性价比选择。',
    amenities: ['包含暖气', '学习室', '洗衣房'],
    location: { lat: 43.6629, lng: -79.3957 },
    s1Benefits: ['室友匹配', '转租协助'],
    status: 'available',
    stockCount: 5,
    leaseTerms: ['12个月', '8个月', 'Short Term'],
    vrUrl: 'https://my.matterport.com/show/?m=example3',
    securityFeatures: ['门禁卡', '视频监控'],
    safetyRating: 4,
    commuteTimes: [
        { label: 'U of T', duration: '3 min', type: 'walk', destination: 'Campus' }
    ]
  }
];
