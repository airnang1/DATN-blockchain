const img1 = require("../images/slides/iphone_11_PNG33.png").default;
const img2 = require("../images/slides/headphones_PNG101976.png").default;
const img3 = require("../images/slides/macbook_PNG11.png").default;

const heroSlides = [
  {
    title: "Iphone với những tính năng vượt trội",
    description:
      "Apple luôn biết cách khiến người dùng háo hức mong chờ mỗi khi sắp ra mắt dòng iPhone mới. Và trong năm nay, iPhone 12 series cũng không ngoại lệ. Cùng tìm hiểu xem smartphone này có gì thú vị mà ai cũng chờ đợi nhé!",
    img: img1,
    path: "/search/iphone",
    color: "blue",
  },
  {
    title: "Phụ kiện điện thoại vô cùng độc đáo",
    description:
      "Thương hiệu Apple đã quá quen thuộc với những tín đồ yêu công nghệ trên toàn thế giới. Bên cạnh các sản phẩm chính, phụ kiện đi kèm của hãng cũng đi đầu về chất lượng. Cùng Điện máy XANH tìm hiểu kỹ hơn các loại phụ kiện của Apple? Có tốt và đáng mua không nhé!",
    img: img2,
    path: "/search/headphones",
    color: "orange",
  },
  {
    title: "Sở hữu những chiếc Macbook với giá rẻ",
    description:
      "MacBook thực chất là dòng sản phẩm máy tính xách tay của thương hiệu nổi tiếng Apple. Với thiết kế vô cùng đẹp mắt cùng hệ điều hành thân thiện, hiệu năng tốt đã giúp MacBook giành được thị phần của hệ điều hành MacOS.",
    img: img3,
    path: "/search/macbook",
    color: "pink",
  },
];
export const desc = ["terrible", "bad", "normal", "good", "wonderful"];

export const category_title_table = [
  {
    title: "Điện Thoại",
    link: "/mobile/tất-cả-sản-phẩm",
    category: [
      {
        name_category: "SamSung",
        listData: [
          "Samsung Galaxy A51",
          "Samsung Galaxy A50s",
          "Samsung Galaxy A10s",
          "Samsung Galaxy A20s 32GB",
          "Samsung Galaxy A71",
          "Samsung Galaxy S20",
          "Samsung Galaxy S10 Lite",
        ],
      },
      {
        name_category: "Apple",
        listData: [
          "IPhone 4",
          "IPhone 4S Plus",
          "IPhone 5",
          "IPhone 5S Plus",
          "IPhone 6",
          "IPhone 7",
          "IPhone 8",
          "IPhone 11",
          "IPhone 12",
          "IPhone 12XS Promax",
        ],
      },
      {
        name_category: "Oppo",
        listData: [
          "Find X Series",
          "OPPO Find X3 Pro",
          "OPPO Find X2 Pro",
          "OPPO Find X2",
          "Reno Series",
          "OPPO Reno6 Z 5G",
          "OPPO Reno6 5G",
          "OPPO A16",
        ],
      },
      {
        name_category: "Xiaomi",
        listData: [
          "Mi 11",
          "Xiaomi Mi 11 Youth Edition",
          "Xiaomi Mi 11 Pro",
          "Xiaomi Mi 11 Ultra",
          "Xiaomi K40",
          "Xiaomi Redmi K40 Pro 5G",
          "Redmi K40 Gaming",
          "Redmi Note 9T",
        ],
      },
    ],
  },
  {
    title: "Máy Tính Bảng",
    link: "tablet/tất-cả-sản-phẩm",
    category: [
      {
        name_category: "SamSung",
        listData: ["Galaxy Tab S7 FE LTE T735", "Galaxy Tab S7 Plus T975"],
      },
      {
        name_category: "Apple",
        listData: ["Ipad Pro M1 11inch", "Ipad Air 10.9"],
      },
    ],
  },
  {
    title: "Laptop",
    link: "laptop/tất-cả-sản-phẩm",
    category: [
      {
        name_category: "Macbook",
        listData: ["Macbook Pro Max", "Macbook Plus", "Macbook Ari"],
      },
      {
        name_category: "Asus",
        listData: [
          "ASUS ZenBook UX434FA",
          "ASUS VivoBook A412FA",
          "ASUS ROG Strix G G531GT",
        ],
      },
      {
        name_category: "Lenovo",
        listData: ["Lenovo Essential", "Lenovo ThinkPad"],
      },
    ],
  },
];
export const data1 = [
  "Tất Cả Sản Phẩm",
  "Điện thoại Smartphone",
  "Điện thoại phổ thông",
  "Điện thoại bàn",
];

export const event_category = [
  "https://salt.tikicdn.com/ts/banner/23/34/9c/51cb06885b4e22ffb4c30ff56c50e05c.jpg",
  "https://salt.tikicdn.com/ts/banner/e9/02/dd/cff9de3c2c0f88c01998fd2c33473232.jpg",
  "https://salt.tikicdn.com/ts/banner/7d/4a/74/72fb253ebffd39a73b94b4a252eb7586.jpg",
  "https://salt.tikicdn.com/ts/banner/5f/f4/da/bba96d974584a2cf52f02cd9d7ab7b32.png",
];

export const data1_02 = ["Tất Cả Sản Phẩm", "Laptop", "PC - Máy Tính Bộ"];

export const data1_03 = ["Tất Cả Sản Phẩm", "Tablet", "Mới nhất"];

export const data2 = ["Bạn muốn giao hàng tới đâu?"];

export const data3 = [
  "Giao Siêu Tốc 24h",
  "Không Giới Hạn",
  "Rẻ Hơn Hoàn Tiền",
];
export const data4 = [
  { rate: 5, title: "Từ 5 sao" },
  { rate: 4, title: "Từ 4 sao" },
  { rate: 3, title: "Dưới 3 sao" },
];
export const data5 = [
  {
    title: "Dưới 500.000",
    price: {
      minPrice: 0,
      maxPrice: 500000,
    },
  },
  {
    title: "Từ 500.000 đến 5.000.000",
    price: {
      minPrice: 500000,
      maxPrice: 5000000,
    },
  },
  {
    title: "Từ 5.000.000 đến 22.500.000",
    price: {
      minPrice: 5000000,
      maxPrice: 22500000,
    },
  },
  {
    title: "Trên 22.500.000",
    price: {
      minPrice: 22500000,
      maxPrice: null,
    },
  },
];
export const data6 = ["32GB", "64GB", "128GB", "256GB"];
export const data7 = [
  "Tất Cả",
  "Samsung",
  "Apple",
  "Xiaomi",
  "OPPO",
  "Masstel",
  "Nokia",
  "Huawei",
];

export const data7_02 = [
  "Tất Cả",
  "Samsung",
  "Apple",
  "Acer",
  "Asus",
  "Dell",
  "LG",
  "Microsoft",
  "China",
];

export const data7_03 = ["Tất Cả", "Samsung", "Apple"];

export const category_search = [
  {
    title: "Điện thoại SmartPhone",
    keyWord: "/mobile/điện-thoại-smart-phone",
    image:
      "https://salt.tikicdn.com/cache/280x280/ts/product/0c/62/39/31879ad1c9cf92b35e58749268ba4ff7.jpg",
    active: true,
  },
  {
    title: "Điện thoại Phổ Thông",
    keyWord: "/mobile/điện-thoại-phổ-thông",
    image:
      "https://salt.tikicdn.com/cache/280x280/ts/product/41/6a/02/0f72d327972ffc0920bc51a67bb651d0.jpg",
    active: true,
  },
  {
    title: "Máy Tính Bảng",
    keyWord: "/tablet/tất-cả-sản-phẩm",
    image:
      "https://salt.tikicdn.com/cache/200x200/ts/product/28/3d/83/5171f45db2b034aab1e5ccff0cfacb62.jpg.webp",
    active: true,
  },
  {
    title: "Laptop Chính Hãng",
    keyWord: "/laptop/tất-cả-sản-phẩm",
    image: "https://pngimg.com/uploads/macbook/small/macbook_PNG3.png",
    active: true,
  },
  {
    title: "Tai Nghe Cực Cool",
    keyWord: "/noUrl/404",
    image:
      "https://salt.tikicdn.com/cache/200x200/media/catalog/product/t/r/tr_ng-1_9_1_.jpg.webp",
    active: false,
  },
  {
    title: "Bàn Phím",
    keyWord: "/noUrl/404",
    image:
      "https://salt.tikicdn.com/cache/200x200/ts/product/7e/d2/1c/d6d94c02949f90f482a33bac437277b3.jpg.webp",
    active: false,
  },
  {
    title: "Chuột",
    keyWord: "/noUrl/404",
    image:
      "https://salt.tikicdn.com/cache/200x200/ts/product/48/ec/cb/ca09fd50f3bc5e14fcdee95103626219.jpg.webp",
    active: false,
  },
  {
    title: "Thẻ Nhớ",
    keyWord: "/noUrl/404",
    image:
      "https://salt.tikicdn.com/cache/280x280/ts/product/8b/1e/7a/0715352cc631df3077b8fa00f492dbda.jpg",
    active: false,
  },
];

export const data8 = [
  "Từ 11MP đến 13MP",
  "Dưới 8MP",
  "Trên 16MP",
  "Từ 14MP đến 16MP",
];
export const data9 = [
  "Trên 12MP",
  "Từ 5MP đến 8MP",
  "Từ 8MP đến 12MP",
  "Dưới 8MP",
];
export const data10 = ["Hàng Nội Địa", "Hàng Quốc Tế"];

export const slide_mobile = [
  "https://salt.tikicdn.com/cache/w1080/ts/banner/f9/c2/92/1aab9d593a04faf0d403e17203ad59b8.jpg.webp",
  "https://salt.tikicdn.com/cache/w1080/ts/banner/2f/70/63/37ad074899b91efd9f225786968ccda7.jpg.webp",
  "https://salt.tikicdn.com/cache/w1080/ts/banner/0f/1f/df/0fbf4177fee0e7faf7346c89bfb8106f.jpg.webp",
  "https://salt.tikicdn.com/cache/w1080/ts/banner/9b/8b/a0/ff13d673e466f0a53ec335c392feda2e.png.webp",
  "https://salt.tikicdn.com/cache/w1080/ts/banner/45/33/5c/7fcc628cd0a1add0edb0069627ceefc3.jpg.webp",
];

export const slide_laptop = [
  "https://salt.tikicdn.com/cache/w1080/ts/banner/86/49/a6/8c96a2e06eed73166df55b3d39dab6d8.jpg.webp",
  "https://salt.tikicdn.com/desktop/img/category-default-banner.png",
];

export const slide_home = [
  {
    img: "https://media.istockphoto.com/photos/apple-iphone-during-ios-update-picture-id1226728983?k=6&m=1226728983&s=612x612&w=0&h=63OVcdhRoMFDCG0_Ppo_V2zBHdBkgH1ze1NaHkBQ1tg=",
    title: "anh 1",
  },
  {
    img: "https://media.istockphoto.com/photos/apple-iphone-11-pro-picture-id1195561906?k=6&m=1195561906&s=612x612&w=0&h=BZTnE8YLuGDNOWQ85cLhjz6W1uyVw9fydwl9vORsacY=",
    title: "anh 2",
  },
  {
    img: "https://media.istockphoto.com/photos/apple-iphone-11-pro-on-a-wooden-surface-apples-new-smartphone-closeup-picture-id1181690502?k=6&m=1181690502&s=612x612&w=0&h=WQUe5Cd3vaDtk_MJ-MdQONsjzcee_wL7nMnC4uNnzAM=",
    title: "anh 3",
  },
  {
    img: "https://media.istockphoto.com/photos/iphone-11-pro-max-on-a-dark-background-picture-id1183970747?k=6&m=1183970747&s=612x612&w=0&h=MCvFbF-ZfHi15qdGILtBPibRD3cd_gJ37FlaoLdr-Vo=",
    title: "anh 4",
  },
];

export const search_item = [
  {
    id: 1,
    content: "Điện thoại IPhone",
    status: "searchAI",
  },
  {
    id: 2,
    content: "Điện thoại Samsung",
    status: "searchAI",
  },
  {
    id: 3,
    content: "Điện thoại Oppo",
    status: "searchAI",
  },
  {
    id: 4,
    content: "Điện thoại Huawai",
    status: "searchAI",
  },
  {
    id: 5,
    content: "Macbook Pro",
    status: "searchAI",
  },
  {
    id: 6,
    content: "Ipad Ari",
    status: "searchAI",
  },
  {
    id: 7,
    content: "Macbook Pro",
    status: "searchAI",
  },
];

export const content_pay_btn = [
  "Ví Iphone Pay",
  "Thẻ Tín Dụng Ghi Nợ",
  "Thanh toán Online",
  "Thanh Toán Khi Nhận Hàng",
];
export const slide_genuine = [
  "https://salt.tikicdn.com/cache/w1080/ts/banner/f9/c2/92/1aab9d593a04faf0d403e17203ad59b8.jpg.webp",
  "https://salt.tikicdn.com/cache/w1080/ts/banner/2f/70/63/37ad074899b91efd9f225786968ccda7.jpg.webp",
  "https://salt.tikicdn.com/cache/w1080/ts/banner/0f/1f/df/0fbf4177fee0e7faf7346c89bfb8106f.jpg.webp",
  "https://salt.tikicdn.com/cache/w1080/ts/banner/9b/8b/a0/ff13d673e466f0a53ec335c392feda2e.png.webp",
  "https://salt.tikicdn.com/cache/w1080/ts/banner/45/33/5c/7fcc628cd0a1add0edb0069627ceefc3.jpg.webp",
];

export const slide_price_shock = [
  "https://cdn.tgdd.vn/2021/08/banner/800-200-800x200-98.png",
  "https://cdn.tgdd.vn/2021/08/banner/800-200-800x200-100.png",
  "https://cdn.tgdd.vn/2021/08/banner/800-200-800x200-102.png",
  "https://cdn.tgdd.vn/2021/08/banner/lapevo-800-200-800x200-1.png",
  "https://cdn.tgdd.vn/2021/08/banner/800-200-800x200-108.png",
  "https://cdn.tgdd.vn/2021/08/banner/800-200-800x200-95.png",
  "https://cdn.tgdd.vn/2021/08/banner/800-200-800x200-101.png",
];

export const slide_laptop_genuine = [
  "https://images.fpt.shop/unsafe/fit-in/240x215/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2021/2/18/637492369087666209_asus-zenbook-ux425-xam-dd-bh-2nam.jpg",
  "https://images.fpt.shop/unsafe/fit-in/240x215/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2021/7/20/637624023473077758_acer-nitro-gaming-an515-57-den-rtx3050-dd-1.jpg",
  "https://images.fpt.shop/unsafe/fit-in/240x215/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2021/7/7/637612635561893293_msi-bravo-15-den-dd.jpg",
  "https://images.fpt.shop/unsafe/fit-in/240x215/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2021/2/25/637498497194722384_FA506LH-LI-dd.jpg",
  "https://images.fpt.shop/unsafe/fit-in/240x215/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2021/7/5/637610886675406247_acer-nitro-gaming-an515-57-den-dd.jpg",
  "https://images.fpt.shop/unsafe/fit-in/240x215/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2020/10/30/637396732533488898_asus-vivobook-a515-bac-dd.png",
];

export const ARR_SEARCH_SIMILAR = [1, 2, 3, 4, 5, 6];
export const evaluate_content = [
  {
    name: "Hate",
    icon: "fa-angry",
  },
  {
    name: "Dislike",
    icon: "fa-frown",
  },
  {
    name: "Neutral",
    icon: "fa-flushed",
  },
  {
    name: "Like",
    icon: "fa-kiss-wink-heart",
  },
  {
    name: "Love",
    icon: "fa-grin-squint-tears",
  },
];
export const pay_method_img = [
  {
    title: "PayPal",
    key: "Thanh toán Online",
    image:
      "https://sedberkdesign.com/wp-content/uploads/2020/06/kisspng-paypal-logo-brand-font-payment-paypal-logo-icon-paypal-icon-logo-png-and-vecto-5b7f273e45e8a9.9067728615350597742864.png",
  },
  {
    title: "MoMo",
    key: "Thanh toán Online",
    image: "https://vmit.com.vn/wp-content/uploads/2021/02/logo-momo.png",
  },
  {
    title: "Metamask",
    key: "Thanh toán Online",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/800px-MetaMask_Fox.svg.png",
  },
];
export const order_status = [
  {
    title: "Đang chờ xử lý",
    icon: "fa-badge-check",
  },
  {
    title: "Đang xử lý",
    icon: "fa-check-square",
  },
  {
    title: "Đã hủy đơn hàng",
    icon: "fa-ban",
  },
];
export const nav_dashboard = [
  {
    name: "Dashboard",
    link: "/dashboard/main",
    icon: "fad fa-tachometer-alt-slowest",
  },
  {
    name: "Widgets",
    link: "/dashboard/widgets/list-all",
    icon: "fad fa-warehouse",
  },
  {
    name: "Charts",
    link: "/dashboard/charts",
    icon: "fad fa-chart-bar",
  },
  {
    name: "Customer",
    link: "/dashboard/customer",
    icon: "fad fa-users",
  },
  {
    name: "Order",
    link: "/dashboard/order",
    icon: "fad fa-bags-shopping",
  },
  {
    name: "Chat",
    link: "/dashboard/chat",
    icon: "fad fa-sms",
  },
  {
    name: "News",
    link: "/dashboard/news",
    icon: "fad fa-newspaper",
  },
  {
    name: "ConfigStore",
    link: "/dashboard/store",
    icon: "fad fa-store",
  },
  {
    name: "Logout",
    link: "/buyer/signin",
    icon: "fad fa-sign-out",
  },
];
export const news_options_demo = [
  {
    title: "News Mobile",
    image:
      "https://www.pngall.com/wp-content/uploads/4/Mobile-Transparent-File.png",
  },
  {
    title: "News Laptop",
    image:
      "https://www.freeiconspng.com/thumbs/laptop-png/mac-laptop-png-13.png",
  },
  {
    title: "News Tablet",
    image:
      "https://freepikpsd.com/media/2019/10/tablet-png-icon-9-Transparent-Images.png",
  },
];

export const render_news_item = [
  {
    id: 1,
    image:
      "https://images.fpt.shop/unsafe/fit-in/490x326/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2021/9/15/637673170533275471_iphone-13-dattruoc-cover-tinhte-1.jpg",
    title:
      "iPhone 13 Series có giá dự kiến từ 21,99 triệu, FPT Shop tặng thêm bộ quà 6 triệu",
    trankmake: "Apple",
    date: "3 giờ trước",
  },
  {
    id: 2,
    image:
      "https://images.fpt.shop/unsafe/filters:quality(90)/fptshop.com.vn/uploads/images/tin-tuc/138990/Originals/iphone-13-pro-8.jpg",
    title:
      "iPhone 13 Pro và iPhone 13 Pro Max ra mắt: Màn hình 120Hz, pin siêu lâu, camera nhiều tính năng",
    trankmake: "Apple",
    date: "3 giờ trước",
  },
  {
    id: 3,
    image:
      "https://images.fpt.shop/unsafe/filters:quality(90)/fptshop.com.vn/uploads/images/tin-tuc/138988/Originals/Apple-watch-series-7-ra-mat-b.jpg",
    title:
      "Apple Watch Series 7 ra mắt: Màn hình lớn và bền bỉ hơn, có hai bản 41mm và 45mm",
    trankmake: "Apple",
    date: "3 giờ trước",
  },
  {
    id: 4,
    image:
      "https://images.fpt.shop/unsafe/filters:quality(90)/fptshop.com.vn/uploads/images/tin-tuc/139045/Originals/1936_qief.jpg",
    title: "Xiaomi chính thức giới thiệu Xiaomi Pad 5 và các sản phẩm AIoT mới",
    trankmake: "Xiaomi",
    date: "3 giờ trước",
  },
];
export const product_options_demo = [
  {
    title: "Mobile",
    image:
      "https://www.pngall.com/wp-content/uploads/4/Mobile-Transparent-File.png",
  },
  {
    title: "Laptop",
    image:
      "https://www.freeiconspng.com/thumbs/laptop-png/mac-laptop-png-13.png",
  },
  {
    title: "Tablet",
    image:
      "https://freepikpsd.com/media/2019/10/tablet-png-icon-9-Transparent-Images.png",
  },
];
export const products_dashboard = [
  {
    name: "Điện thoại Iphone XS MaX Pro",
    price: 20000000,
    image:
      "https://cdn.tgdd.vn/Products/Images/42/213033/iphone-12-pro-max-xanh-duong-new-600x600-600x600.jpg",
    trakemart: "Apple",
  },
  {
    name: "SamSung Galasy S21 5G",
    price: 30000000,
    image:
      "https://cdn.tgdd.vn/Products/Images/42/220833/samsung-galaxy-s21-trang-600x600.jpg",
    trakemart: "SamSung",
  },
];
export const style_map = {
  maptiler: {
    url: "https://api.maptiler.com/maps/basic/256/{z}/{x}/{y}@2x.png?key=yC8N8BSR0k3c2U8qIbrB",
    attribution:
      '&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
  },
};

export const skeletonProduct = [
  { item: 1 },
  { item: 2 },
  { item: 3 },
  { item: 4 },
  { item: 5 },
];
export const metaMaskLink =
  "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn";

export default heroSlides;
