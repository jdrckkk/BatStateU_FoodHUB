//Login and Authentication

function showLogin() {
  document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
  document.getElementById('loginPage').classList.add('active');
}

function showAdminLogin() {
  document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
  document.getElementById('adminLoginPage').classList.add('active');
}

function showStudentDashboard() {
  document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
  document.getElementById('studentDashboard').classList.add('active');
  loadStalls();
}

function adminLogin(event) {
  event.preventDefault();
  const stallId = document.getElementById('adminStallSelect').value;
  const password = document.getElementById('adminPassword').value;

  if (!stallId) {
    showNotification('Please select a stall', 'error');
    return;
  }

  if (password === 'admin123') {
    localStorage.setItem('adminAuth', stallId);
    localStorage.setItem('currentStallId', stallId);
    showAdminDashboard();
  } else {
    showNotification('Invalid password. Use "admin123" for demo', 'error');
  }
}

function showAdminDashboard() {
  const stallId = localStorage.getItem('adminAuth');
  if (!stallId) {
    showAdminLogin();
    return;
  }
  document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
  document.getElementById('adminDashboard').classList.add('active');
  updateAdminDashboardHeader();
  loadAdminDashboardData();
}

function updateAdminDashboardHeader() {
  const stallId = localStorage.getItem('currentStallId');
  if (stallId) {
    const stall = stalls.find(s => s.id === parseInt(stallId));
    if (stall) {
      const stallNameElement = document.querySelector('#adminStallNameDisplay');
      if (stallNameElement) {
        stallNameElement.textContent = stall.name;
      }
    }
  }
}

function loadAdminDashboardData() {
  const stallId = localStorage.getItem('currentStallId');
  if (stallId) {
    const stall = stalls.find(s => s.id === parseInt(stallId));
    if (stall) {
      document.getElementById('adminStallName').value = stall.name || '';
      document.getElementById('adminStallDescription').value = stall.description || '';
      const statusInput = document.querySelector(`input[name="stallStatus"][value="${stall.status}"]`);
      if (statusInput) statusInput.checked = true;
      // Populate contact fields if available
      const phoneEl = document.getElementById('adminStallPhone');
      const emailEl = document.getElementById('adminStallEmail');
      const locationEl = document.getElementById('adminStallLocation');
      if (phoneEl) phoneEl.value = stall.phone || '';
      if (emailEl) emailEl.value = stall.email || '';
      if (locationEl) locationEl.value = stall.location || '';
    }
  }
}

function showMenuManagement() {
  const stallId = localStorage.getItem('currentStallId');
  if (!stallId) {
    showNotification('Please login first', 'error');
    return;
  }
  document.getElementById('menuManagementModal').classList.add('active');
  loadMenuManagementData();
}

function closeMenuManagement() {
  document.getElementById('menuManagementModal').classList.remove('active');
}

function loadMenuManagementData() {
  const stallId = parseInt(localStorage.getItem('currentStallId'));
  const stall = stalls.find(s => s.id === stallId);
  if (!stall) return;
  currentMenuItems = generateCurrentMenuItems(stallId);
  renderMenuManagement();
  updateMenuStats();
}

// Resolve menu image path per-stall/item. Add mappings for specific stalls like Julie's Bakeshop.
function getMenuItemImagePath(stallName, index, stallId) {
  // Julie's Bakeshop: use local svg placeholders we created
  if (stallName === "Julie's Bakeshop") {
    // Julie's has 10 items; map to julies_1.svg .. julies_10.svg
    return `public/images/julies_bakeshop/julies_${index}.svg`;
  }

  // Tender Juicy specific mapping (if you keep the folder)
  if (stallName === 'Tender Juicy Hotdogs' && (getMenuItemName(stallName, index) || '').toLowerCase().includes("chick")) {
    return 'public/images/tender juicy/tj-chickncheese.jpg';
  }

  // Default generated pattern
  return `public/images/menu${stallId}_${index}.jpg`;
}

function generateCurrentMenuItems(stallId) {
  const stall = stalls.find(s => s.id === stallId);
  const items = [];
  for (let i = 1; i <= stall.menuCount; i++) {
    items.push({
      id: i,
      name: getMenuItemName(stall.name, i),
      description: getMenuItemDescription(stall.name, i),
      price: getMenuItemPrice(stall.name, i),
      available: Math.random() > 0.15,
      category: getMenuCategory(stall.name, i),
      image: getMenuItemImagePath(stall.name, i, stallId)
    });
  }
  return items;
}

function getMenuItemName(stallName, index) {
  const itemNames = {
    'Theatery': [
      'Adobo - 1 Rice', 'Adobo - 2 Rice', 'Adobo - 1 Rice 2 Ulam',
      'Sisig - 1 Rice', 'Sisig - 2 Rice', 'Sisig - 1 Rice 2 Ulam',
      'Barbeque - 1 Rice', 'Barbeque - 2 Rice', 'Barbeque - 1 Rice 2 Ulam',
      'Bicol Express - 1 Rice', 'Bicol Express - 2 Rice', 'Bicol Express - 1 Rice 2 Ulam',
      'Pinakbet - 1 Rice', 'Pinakbet - 2 Rice', 'Pinakbet - 1 Rice 2 Ulam',
      'Monggo - 1 Rice', 'Monggo - 2 Rice', 'Monggo - 1 Rice 2 Ulam',
      'Chicken - 1 Rice', 'Chicken - 2 Rice', 'Chicken - 1 Rice 2 Ulam',
      'Porkchop - 1 Rice', 'Porkchop - 2 Rice', 'Porkchop - 1 Rice 2 Ulam'
    ],
    'Spot-G Food Hub': [
      'Adobo - 1 Rice', 'Adobo - 2 Rice', 'Adobo - 1 Rice 2 Ulam',
      'Sisig - 1 Rice', 'Sisig - 2 Rice', 'Sisig - 1 Rice 2 Ulam',
      'Barbeque - 1 Rice', 'Barbeque - 2 Rice', 'Barbeque - 1 Rice 2 Ulam',
      'Bicol Express - 1 Rice', 'Bicol Express - 2 Rice', 'Bicol Express - 1 Rice 2 Ulam',
      'Pinakbet - 1 Rice', 'Pinakbet - 2 Rice', 'Pinakbet - 1 Rice 2 Ulam',
      'Monggo - 1 Rice', 'Monggo - 2 Rice', 'Monggo - 1 Rice 2 Ulam',
      'Chicken - 1 Rice', 'Chicken - 2 Rice', 'Chicken - 1 Rice 2 Ulam',
      'Porkchop - 1 Rice', 'Porkchop - 2 Rice', 'Porkchop - 1 Rice 2 Ulam'
    ],
    'Little Tokyo Takoyaki': [
      "Bacon n' Cheese - 4 pcs", "Bacon n' Cheese - 8 pcs",
      'Chilicon yaki - 4 pcs', 'Chilicon yaki - 8 pcs',
      'Octobits - 4 pcs', 'Octobits - 8 pcs',
      'Vegie Cheese - 4 pcs', 'Vegie Cheese - 8 pcs'
    ],
    'RC Beef Shawarma': ['Shawarma Nachos', 'Shawarma Pita', 'Shawarma w/cheeze', 'Shawarma Rice'],

    'Juice Bar': ['Blue Lemonade - Small', 'Blue Lemonade - Large', 'Cucumber - Small', 'Cucumber - Large', 'Melon - Small', 'Melon - Large', 'Black Gulaman - Small', 'Black Gulaman - Large', 'Red Tea - Small', 'Red Tea - Large'],
    'Chowking': ['Large Chicharap', 'Chunky Asado Siopao', '1pc Chicken w/ Rice', '1pc Chicken w/ Chao Fan', 'Steamed Pork Dumplings', 'Fried Spring Roll', 'Mixed Vegetables', 'Fried Rice with Egg', 'Mixed Vegetable Chopsuey', 'Halo-Halo Dessert'],
    'Fried Noodles Haus': ['Rice and Gulay', 'Rice and Ulam', 'Rice, Ulam and Gulay', 'Rice, Ulam and Saging', 'Rice, Ulam, Gulay and Lecheflan', 'Fried Noodles - Single', 'Fried Noodles - Double', 'Fried Noodles - Jumbo'],
    'ITSNOK Binalot': ['Chicken Pastil', 'Chicken Pastil with Atchara', 'Pork Pastil with Atchara', 'Beef Pastil with Atchara', 'Pancit Canton', 'Soft Drink'],
    "Gian's Buko Juice": ['Buko Juice', 'Buko Shake - Small', 'Buko Shake - Medium', 'Buko Shake - Large'],
    "RR Sorella's": [
      'Cheesy Garlic - Whole', 'Cheesy Garlic - 1 Slice', 'Cheesy Garlic - 2 Slices',
      'Buffalo - Whole', 'Buffalo - 1 Slice', 'Buffalo - 2 Slices',
      'Ham and Cheese - Whole', 'Ham and Cheese - 1 Slice', 'Ham and Cheese - 2 Slices',
      'Pepperoni - Whole', 'Pepperoni - 1 Slice', 'Pepperoni - 2 Slices',
      'Hawaiian - Whole', 'Hawaiian - 1 Slice', 'Hawaiian - 2 Slices',
      'Cheesy Garlic (White Sauce) - Whole', 'Cheesy Garlic (White Sauce) - 1 Slice', 'Cheesy Garlic (White Sauce) - 2 Slices',
      'Garden Fresh - Whole', 'Garden Fresh - 1 Slice', 'Garden Fresh - 2 Slices',
      'Spinach Pizza - Whole', 'Spinach Pizza - 1 Slice', 'Spinach Pizza - 2 Slices',
      'Bacon and Cheese - Whole', 'Bacon and Cheese - 1 Slice', 'Bacon and Cheese - 2 Slices',
      'Overload - Whole', 'Overload - 1 Slice', 'Overload - 2 Slices'
    ],
    'Tender Juicy Hotdogs': [
      'Hungarian - On stick','Jumbo - On stick',"Chick n' Cheese - On stick",'King Size - On stick', 'Giant - On stick','Hungarian - Sandwich','Jumbo - Sandwich',"Chick n' Cheese - Sandwich",'King Size - Sandwich','Giant - Sandwich','Half Long - Sandwich','Foot Long - Sandwich'
    ],
    'Potato Corner': ['Flavored Fries Regular', 'Flavored Fries Large', 'Flavored Fries Jumbo', 'Flavored Fries Mega', 'Flavored Fries Giga', 'Flavored Fries Terra', 'Crunchy Chicken Pops Solo', 'Crunchy Chicken Pops Large', 'Crunchy Chicken Pops Medium', 'Loopys Large', 'Loopys Mega', 'Mix & Match Large'],
    "Julie's Bakeshop": ['Graciosa w/icing', 'Cheese Bun', 'Choco German', 'Spanish', 'Pande Coco', 'Marble Ring', 'Cheese Streussel', 'Violet Cream Loaf Mini', 'Yema Cake', 'Ensaymada'],
    "Ash-Min's": ['Fried Chicken', 'Pork Chop', 'Beef Steak', 'Lumpia Shanghai', 'Pancit Bihon', 'Adobo', 'Sinigang', 'Kare-Kare', 'Fried Fish', 'Dinuguan'],
    'Waffle Time': ['White Cheese', 'Hazelnut', 'Cream Cheese', "Tj Chicken Hotdog", 'Bacon & Cheese', 'Belgian Chocolate', 'Tuna Salad', "Ham N' Cheese", 'Cheese Delite', 'Ultimate Ube', 'Bavarian Cream'],
    'Cafe Aromatiko': [
      // Frappe flavors 
      'Frappe - Java Chip 16oz',
      'Frappe - Java Chip 22oz',
      'Frappe - White Mocha 16oz',
      'Frappe - White Mocha 22oz',
      'Frappe - Cookies and Cream 16oz',
      'Frappe - Cookies and Cream 22oz',
      'Frappe - Dark Chocolate 16oz',
      'Frappe - Dark Chocolate 22oz',
      'Frappe - Matcha 16oz',
      'Frappe - Matcha 22oz',
      'Frappe - Strawberry 16oz',
      'Frappe - Strawberry 22oz',
      // Milk Tea flavors 
      'Milktea - Taro 16oz',
      'Milktea - Taro 22oz',
      'Milktea - Hokkaido 16oz',
      'Milktea - Hokkaido 22oz',
      'Milktea - Okinawa 16oz',
      'Milktea - Okinawa 22oz',
      'Milktea - Matcha 16oz',
      'Milktea - Matcha 22oz',
      'Milktea - Winter Melon 16oz',
      'Milktea - Winter Melon 22oz',
      'Milktea - Salted Caramel 16oz',
      'Milktea - Salted Caramel 22oz'
      ,
      // Hot Coffee
      'Hot Coffee - Americano 8oz',
      'Hot Coffee - Americano 12oz',
      'Hot Coffee - Vanilla Cafe 8oz',
      'Hot Coffee - Vanilla Cafe 12oz',
      'Hot Coffee - Cappuccino 8oz',
      'Hot Coffee - Cappuccino 12oz',
      'Hot Coffee - Mocha 8oz',
      'Hot Coffee - Mocha 12oz',
      'Hot Coffee - Spanish Latte 8oz',
      'Hot Coffee - Spanish Latte 12oz',
      'Hot Coffee - Caramel Macchiato 8oz',
      'Hot Coffee - Caramel Macchiato 12oz'
      ,
      // Ice Coffee
      'Ice Coffee - Americano 16oz',
      'Ice Coffee - Americano 22oz',
      'Ice Coffee - Vanilla Cafe 16oz',
      'Ice Coffee - Vanilla Cafe 22oz',
      'Ice Coffee - Cappuccino 16oz',
      'Ice Coffee - Cappuccino 22oz',
      'Ice Coffee - Mocha 16oz',
      'Ice Coffee - Mocha 22oz',
      'Ice Coffee - Spanish Latte 16oz',
      'Ice Coffee - Spanish Latte 22oz',
      'Ice Coffee - Caramel Macchiato 16oz',
      'Ice Coffee - Caramel Macchiato 22oz'
      ]
  };
  const stallItems = itemNames[stallName];
  return stallItems ? stallItems[index - 1] : `${stallName} Item ${index}`;
}

function getMenuItemDescription(stallName, index) {
  const stallDescriptions = {
    'Theatery': [
      // Theatery rice meal descriptions (Adobo, Sisig, Barbeque, Bicol Express, Pinakbet, Monggo, Chicken, Porkchop)
      'Classic pork adobo served with steamed rice (1 rice)',
      'Classic pork adobo served with extra rice (2 rice)',
      'Adobo served with steamed rice plus two ulam sides',
      'Sizzling sisig with onions and chili (1 rice)',
      'Sizzling sisig with extra rice (2 rice)',
      'Sisig served with rice plus two ulam sides',
      'Grilled barbeque skewers with tangy glaze (1 rice)',
      'Grilled barbeque with extra rice (2 rice)',
      'Barbeque served with rice plus two ulam sides',
      'Spicy Bicol Express with coconut milk and chili (1 rice)',
      'Bicol Express with extra rice (2 rice)',
      'Bicol Express served with rice plus two ulam sides',
      'Vegetable pinakbet with bagoong (1 rice)',
      'Pinakbet served with extra rice (2 rice)',
      'Pinakbet served with rice plus two ulam sides',
      'Savory monggo (mung bean stew) with sides (1 rice)',
      'Monggo with extra rice (2 rice)',
      'Monggo served with rice plus two ulam sides',
      'Fried or roasted chicken entrée with rice (1 rice)',
      'Chicken entrée with extra rice (2 rice)',
      'Chicken served with rice plus two ulam sides',
      'Pan-seared porkchop with gravy (1 rice)',
      'Porkchop with extra rice (2 rice)',
      'Porkchop served with rice plus two ulam sides'
    ],
    'Spot-G Food Hub': [
      'Savory pork adobo with rice (1 rice)',
      'Adobo with extra rice (2 rice)',
      'Adobo served with rice plus two ulam sides',
      'Sizzling pork sisig with rice (1 rice)',
      'Sisig with extra rice (2 rice)',
      'Sisig served with rice plus two ulam sides',
      'Grilled barbeque with rice (1 rice)',
      'Barbeque with extra rice (2 rice)',
      'Barbeque served with rice plus two ulam sides',
      'Spicy bicol express with rice (1 rice)',
      'Bicol express with extra rice (2 rice)',
      'Bicol express served with rice plus two ulam sides',
      'Fresh vegetable pinakbet with rice (1 rice)',
      'Pinakbet with extra rice (2 rice)',
      'Pinakbet served with rice plus two ulam sides',
      'Savory monggo beans with rice (1 rice)',
      'Monggo with extra rice (2 rice)',
      'Monggo served with rice plus two ulam sides',
      'Chicken entrée with rice (1 rice)',
      'Chicken entrée with extra rice (2 rice)',
      'Chicken served with rice plus two ulam sides',
      'Pan-seared porkchop with gravy (1 rice)',
      'Porkchop with extra rice (2 rice)',
      'Porkchop served with rice plus two ulam sides'
    ],
    'Little Tokyo Takoyaki': [
      "Bacon n' Cheese - 4 pieces of takoyaki topped with bacon and cheese",
      "Bacon n' Cheese - 8 pieces of takoyaki topped with bacon and cheese",
      'Chilicon yaki - 4 pieces spicy takoyaki with chili seasoning',
      'Chilicon yaki - 8 pieces spicy takoyaki with chili seasoning',
      'Octobits - 4 pieces with octopus bits',
      'Octobits - 8 pieces with octopus bits',
      'Vegie Cheese - 4 pieces vegetarian takoyaki with cheese',
      'Vegie Cheese - 8 pieces vegetarian takoyaki with cheese'
    ],
    'RC Beef Shawarma': ['Shawarma nachos topped with seasoned meat and cheese', 'Shawarma served in soft pita', 'Shawarma with extra cheese', 'Shawarma served with rice and sides'],
    'Juice Bar': ['Refreshing blue lemonade (small)', 'Refreshing blue lemonade (large)', 'Cooling cucumber drink (small)', 'Cooling cucumber drink (large)', 'Sweet melon juice (small)', 'Sweet melon juice (large)', 'Black gulaman refreshment (small)', 'Black gulaman refreshment (large)', 'Red tea refreshment (small)', 'Red tea refreshment (large)'],
    'Chowking': ['Pork fried rice with chow', 'Beef noodles in wonton soup', 'Sweet and sour pork dish', 'Chicken over rice combo', 'Steamed pork dumplings', 'Fried spring roll', 'Stir-fried mixed vegetables', 'Fried rice with egg', 'Mixed vegetable chopsuey', 'Iced dessert halo-halo'],
    'Fried Noodles Haus': [
      'Rice with fresh vegetables',
      'Rice with protein',
      'Rice with protein and vegetables',
      'Rice with protein and banana',
      'Rice with protein, vegetables, banana and lecheflan',
      'Fried noodles single portion',
      'Fried noodles double portion',
      'Fried noodles jumbo portion'
    ],
    'ITSNOK Binalot': ['Chicken Pastil', 'Chicken Pastil with Atchara', 'Pork Pastil with Atchara', 'Beef Pastil with Atchara', 'Pancit Canton', 'Soft Drink'],
    "Gian's Buko Juice": ['Fresh buko water', 'Creamy buko shake small', 'Creamy buko shake medium', 'Creamy buko shake large'],
    "RR Sorella's": [
      'Cheesy garlic pizza whole', 'Single slice cheesy garlic', 'Two slices cheesy garlic',
      'Buffalo-style whole pizza', 'Single slice buffalo', 'Two slices buffalo',
      'Ham and cheese whole pizza', 'Single slice ham & cheese', 'Two slices ham & cheese',
      'Pepperoni whole pizza', 'Single slice pepperoni', 'Two slices pepperoni',
      'Hawaiian whole pizza with ham and pineapple', 'Single slice Hawaiian', 'Two slices Hawaiian',
      'Cheesy garlic in white sauce whole', 'Single slice cheesy garlic (white sauce)', 'Two slices cheesy garlic (white sauce)',
      'Garden fresh whole pizza with veggies', 'Single slice garden fresh', 'Two slices garden fresh',
      'Spinach pizza whole', 'Single slice spinach pizza', 'Two slices spinach pizza',
      'Bacon and cheese whole pizza', 'Single slice bacon & cheese', 'Two slices bacon & cheese',
      'Overload whole pizza with extra toppings', 'Single slice overload', 'Two slices overload'
    ],
    'Tender Juicy Hotdogs': [
      'Hungarian style hotdog on a stick',
      'Jumbo hotdog on a stick',
      "Chicken and cheese on a stick",
      'King size hotdog on a stick',
      'Giant premium hotdog on a stick',
      'Hungarian hotdog served as a sandwich',
      'Jumbo hotdog sandwich',
      "Chicken and cheese sandwich",
      'King size hotdog sandwich',
      'Giant hotdog sandwich',
      'Half long hotdog sandwich',
      'Foot long hotdog sandwich'
    ],
    'Potato Corner': ['Crispy regular size fries', 'Large portion fries', 'Jumbo size fries', 'Mega size fries', 'Giga size fries', 'Terra extra large fries', 'Solo chicken pops crispy', 'Large chicken pops', 'Medium chicken pops', 'Large loopys rings', 'Mega loopys rings', 'Large mix combo'],
    "Julie's Bakeshop": ['Glazed graciosa pastry', 'Soft cheese bun', 'Chocolate German bread', 'Sweet Spanish bread', 'Coconut pande coco', 'Marble patterned ring', 'Cheese streussel topping', 'Mini violet cream loaf', 'Sweet yema cake', 'Golden ensaymada roll'],
    "Ash-Min's": ['Crispy fried chicken', 'Grilled pork chop', 'Tender beef steak', 'Crispy lumpia shanghai', 'Stir-fried pancit bihon', 'Savory pork adobo', 'Hearty sinigang soup', 'Peanut sauce kare-kare', 'Fried fish fillet', 'Spicy blood stew dinuguan'],
    'Waffle Time': ['White cheese topped waffle', 'Hazelnut spread waffle', 'Cream cheese waffle', 'Tj Chicken Hotdog waffle', 'Bacon and cheese waffle', 'Belgian chocolate waffle', 'Tuna salad waffle', 'Ham and cheese waffle', 'Cheese delite mini waffle', 'Ultimate ube waffle', 'Bavarian cream filled waffle'],
    'Cafe Aromatiko': [
      // Frappe descriptions (12)
      'Rich Java Chip frappe with chocolate bits',
      'Large Java Chip frappe with extra chocolate',
      'Creamy White Mocha frappe with vanilla sweetness',
      'Large White Mocha frappe with extra cream',
      'Cookies & Cream frappe topped with cookie crumbs',
      'Large Cookies & Cream frappe serving',
      'Decadent Dark Chocolate frappe',
      'Large Dark Chocolate frappe serving',
      'Premium Matcha frappe with ceremonial matcha',
      'Large Matcha frappe serving',
      'Strawberry frappe made with fresh strawberry purée',
      'Large Strawberry frappe serving',
      // Milk Tea descriptions (12)
      'Classic Taro milk tea with creamy taro flavor',
      'Large Taro milk tea serving',
      'Hokkaido milk tea with rich milky notes',
      'Large Hokkaido milk tea serving',
      'Okinawa milk tea with brown sugar caramel flavor',
      'Large Okinawa milk tea serving',
      'Matcha milk tea with smooth green tea profile',
      'Large Matcha milk tea serving',
      'Winter Melon milk tea with mellow sweetness',
      'Large Winter Melon milk tea serving',
      'Salted Caramel milk tea with sweet-salty balance',
      'Large Salted Caramel milk tea serving',
      // Hot Coffee descriptions (Americano and flavored hot coffees)
      'Americano hot coffee — robust espresso with hot water (8oz)',
      'Americano hot coffee — larger serving (12oz)',
      'Vanilla Cafe hot coffee with vanilla syrup (8oz)',
      'Vanilla Cafe hot coffee larger serving (12oz)',
      'Classic Cappuccino with steamed milk and foam (8oz)',
      'Classic Cappuccino larger serving (12oz)',
      'Mocha hot chocolate-coffee blend with steamed milk (8oz)',
      'Mocha larger serving with extra chocolate (12oz)',
      'Spanish Latte sweetened latte with condensed milk (8oz)',
      'Spanish Latte larger serving (12oz)',
      'Caramel Macchiato layered caramel and espresso with steamed milk (8oz)',
      'Caramel Macchiato larger serving (12oz)'
    ,
      // Ice Coffee descriptions (Americano and flavored iced coffees)
      'Iced Americano — chilled espresso with cold water (16oz)',
      'Iced Americano — larger chilled serving (22oz)',
      'Iced Vanilla Cafe — vanilla-flavored iced coffee (16oz)',
      'Iced Vanilla Cafe — larger iced serving (22oz)',
      'Iced Cappuccino — chilled cappuccino-style drink (16oz)',
      'Iced Cappuccino — larger iced serving (22oz)',
      'Iced Mocha — chilled mocha with chocolate and espresso (16oz)',
      'Iced Mocha — larger iced serving (22oz)',
      'Iced Spanish Latte — sweetened iced latte (16oz)',
      'Iced Spanish Latte — larger iced serving (22oz)',
      'Iced Caramel Macchiato — layered iced caramel and espresso (16oz)',
      'Iced Caramel Macchiato — larger iced serving (22oz)'
    ]
  };
  const defaultDescriptions = ['Delicious dish', 'Fresh specialty', 'Quality food', 'House favorite', 'Chef special', 'Popular choice', 'Premium quality', 'Signature taste', 'Great value', 'Must try item'];
  const descriptions = stallDescriptions[stallName] || defaultDescriptions;
  return descriptions[index - 1] || 'Delicious menu item';
}

function getMenuItemPrice(stallName, index) {
  const stallPrices = {
    'Theatery': [
      // Theatery rice meal prices (each dish: 1 rice=50, 2 rice=55, 1 rice + 2 ulam=65)
      50, 55, 65,
      50, 55, 65,
      50, 55, 65,
      50, 55, 65,
      50, 55, 65,
      50, 55, 65,
      50, 55, 65,
      50, 55, 65
    ],
    'Spot-G Food Hub': [
      50, 55, 65,
      50, 55, 65,
      50, 55, 65,
      50, 55, 65,
      50, 55, 65,
      50, 55, 65,
      50, 55, 65,
      50, 55, 65
    ],
    'Little Tokyo Takoyaki': [58, 168, 68, 198, 68, 198, 48, 138],
    'RC Beef Shawarma': [90, 85, 100, 65, 55, 65, 70, 25, 35, 150],
    'Juice Bar': [15, 20, 15, 20, 15, 20, 15, 20, 15, 20],
    'Chowking': [75, 85, 80, 95, 55, 40, 45, 70, 75, 65],
    'Fried Noodles Haus': [45, 50, 75, 65, 85, 35, 65, 95],
    "Gian's Buko Juice": [60, 50, 70, 85],
    'ITSNOK Binalot': [50, 70, 75, 95, 35, 15],
    "RR Sorella's": [
      215, 30, 57,
      295, 40, 76,
      230, 32, 61,
      250, 35, 66,
      250, 35, 66,
      230, 32, 61,
      270, 30, 77,
      310, 42, 80,
      295, 40, 78,
      305, 41, 78
    ],
    'Tender Juicy Hotdogs': [55, 25, 30, 40, 45, 60, 30, 35, 45, 50, 25, 50],
    'RC Beef Shawarma': [55, 60, 65, 70],
    'Potato Corner': [41, 67, 97, 127, 198, 228, 75, 95, 199, 75, 135, 99],
    "Julie's Bakeshop": [10, 12, 10, 10, 12, 12, 12, 20, 25, 25],
    "Ash-Min's": [75, 70, 80, 45, 55, 75, 70, 85, 95, 65],
    'Waffle Time': [32, 32, 35, 32, 35, 30, 32, 32, 25, 26, 28],
    'Cafe Aromatiko': [
      // Frappe prices (6 flavors × 2 sizes)
      69, 79, 69, 79, 69, 79, 69, 79, 69, 79, 69, 79,
      // Milk Tea prices (6 flavors × 2 sizes)
      49, 59, 49, 59, 49, 59, 49, 59, 49, 59, 49, 59,
      // Hot Coffee prices (Americano: 8oz=39,12oz=49; others: 8oz=45,12oz=59)
      39, 49,
      45, 59,
      45, 59,
      45, 59,
      45, 59,
      45, 59,
      // Ice Coffee prices (Americano: 16oz=49,22oz=59; others: 16oz=55,22oz=65)
      49, 59,
      55, 65,
      55, 65,
      55, 65,
      55, 65,
      55, 65
    ]
  };
  const defaultPrices = [50, 60, 70, 65, 75, 80, 55, 90, 85, 95];
  const prices = stallPrices[stallName] || defaultPrices;
  return prices[index - 1] || 50;
}

function getMenuCategory(stallName, index) {
  const stallCategories = {
    'Theatery': 'Main Dish',
    'Spot-G Food Hub': 'Main Dish',
    'Little Tokyo Takoyaki': ['Snack','Snack','Snack','Snack','Snack','Snack','Snack','Snack'],
    'RC Beef Shawarma': ['Main Dish', 'Main Dish', 'Main Dish', 'Main Dish', 'Appetizer', 'Appetizer', 'Appetizer', 'Snack', 'Appetizer', 'Main Dish'],
    'Juice Bar': ['Beverage','Beverage','Beverage','Beverage','Beverage','Beverage','Beverage','Beverage','Beverage','Beverage'],
    'Chowking': ['Main Dish', 'Main Dish', 'Main Dish', 'Main Dish', 'Appetizer', 'Snack', 'Snack', 'Main Dish', 'Main Dish', 'Dessert'],
    'Fried Noodles Haus': ['Main Dish', 'Main Dish', 'Main Dish', 'Main Dish', 'Main Dish', 'Main Dish', 'Main Dish', 'Main Dish'],
    'ITSNOK Binalot': ['Main Dish', 'Main Dish', 'Main Dish', 'Main Dish', 'Main Dish', 'Beverage'],
    "Gian's Buko Juice": ['Beverage', 'Beverage', 'Beverage', 'Beverage'],
    "RR Sorella's": [
      'Pizza','Pizza','Pizza','Pizza','Pizza','Pizza','Pizza','Pizza','Pizza','Pizza',
      'Pizza','Pizza','Pizza','Pizza','Pizza','Pizza','Pizza','Pizza','Pizza','Pizza',
      'Pizza','Pizza','Pizza','Pizza','Pizza','Pizza','Pizza','Pizza','Pizza','Pizza'
    ],
    'RC Beef Shawarma': ['Snack','Snack','Snack','Main Dish'],
    'Tender Juicy Hotdogs': ['Snack', 'Snack', 'Snack', 'Snack', 'Snack', 'Main Dish', 'Main Dish', 'Main Dish', 'Main Dish', 'Main Dish', 'Main Dish', 'Main Dish'],
    'Potato Corner': ['Snack', 'Snack', 'Snack', 'Snack', 'Snack', 'Snack', 'Snack', 'Snack', 'Snack', 'Snack', 'Snack', 'Snack'],
    "Julie's Bakeshop": ['Snack', 'Snack', 'Snack', 'Snack', 'Snack', 'Snack', 'Snack', 'Snack', 'Dessert', 'Snack'],
    "Ash-Min's": ['Main Dish', 'Main Dish', 'Main Dish', 'Appetizer', 'Main Dish', 'Main Dish', 'Main Dish', 'Main Dish', 'Main Dish', 'Main Dish'],
    'Waffle Time': ['Dessert','Dessert','Dessert','Dessert','Dessert','Dessert','Dessert','Dessert','Dessert','Dessert','Dessert'],
    'Cafe Aromatiko': [
      // 12 Frappe & Milktea entries (already Beverage)
      'Beverage','Beverage','Beverage','Beverage','Beverage','Beverage',
      'Beverage','Beverage','Beverage','Beverage','Beverage','Beverage',
      'Beverage','Beverage','Beverage','Beverage','Beverage','Beverage',
      'Beverage','Beverage','Beverage','Beverage','Beverage','Beverage',
      // Hot Coffee entries (12)
      'Beverage','Beverage','Beverage','Beverage','Beverage','Beverage',
      'Beverage','Beverage','Beverage','Beverage','Beverage','Beverage',
      // Ice Coffee entries (12)
      'Beverage','Beverage','Beverage','Beverage','Beverage','Beverage',
      'Beverage','Beverage','Beverage','Beverage','Beverage','Beverage'
    ]
  };
  const defaultCategories = ['Main Dish', 'Beverage', 'Snack', 'Dessert', 'Appetizer'];
  const categories = stallCategories[stallName] || defaultCategories;
  // Handle both string (single category for all items) and array (category per item)
  if (typeof categories === 'string') {
    return categories;
  }
  return categories[index - 1] || 'Main Dish';
}

function getMenuItemImageQuery(stallName, index) {
  const queries = {
    'Theatery': 'premium coffee latte art professional beverage photography',
    'Spot-G Food Hub': 'Filipino food dishes adobo steak fried chicken professional food photography',
    'Little Tokyo Takoyaki': 'authentic Japanese takoyaki street food traditional',
    'RC Beef Shawarma': 'beef shawarma seasoned meat pita wraps middle eastern street food',
    'Juice Bar': 'blue lemonade cucumber melon black gulaman red tea refreshing drinks',
    'Chowking': 'Filipino Chinese cuisine chao fan wonton noodles',
    'Fried Noodles Haus': 'asian noodles stir fry wok cooking',
    'ITSNOK Binalot': 'Filipino rice meal adobo binalot traditional',
    "Gian's Buko Juice": 'fresh coconut buko juice tropical beverage',
    "RR Sorella's": 'homemade pizza cheesy garlic pepperoni buffalo hawaiian gourmet pizza',
    'Tender Juicy Hotdogs': 'gourmet hotdog sausage grilled meat fast food',
    'Potato Corner': 'crispy french fries seasoned potatoes fast food',
    "Julie's Bakeshop": 'Filipino bakery bread pastries baked goods fresh',
    "Ash-Min's": 'Filipino comfort food fried chicken adobo meals',
    'Waffle Time': 'sweet waffles belgian waffle toppings dessert breakfast street food',
    'Cafe Aromatiko': 'premium coffee cafe gourmet food elegant setting'
  };
  return queries[stallName] || 'delicious restaurant food item professional food photography';
}

let currentMenuItems = [];

function renderMenuManagement() {
  const container = document.getElementById('menuItemsContainer');
  container.innerHTML = '';
  currentMenuItems.forEach((item, index) => {
    const menuCard = document.createElement('div');
    menuCard.className = 'bg-gray-50 rounded-xl p-6 border border-gray-200 hover:border-primary transition-colors';
    menuCard.innerHTML = `
      <div class="flex items-start space-x-6">
        <div class="relative">
          <div class="relative group cursor-pointer" onclick="changeMenuItemImage(${index})">
            <img src="${item.image}" alt="${item.name}" class="w-24 h-16 rounded-lg object-cover object-top">
            <div class="absolute inset-0 bg-black bg-opacity-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <i class="ri-image-edit-line text-white ri-lg"></i>
            </div>
          </div>
          <div class="absolute -top-2 -right-2">
            <button onclick="removeMenuItem(${index})" class="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors">
              <div class="w-4 h-4 flex items-center justify-center">
                <i class="ri-close-line text-xs"></i>
              </div>
            </button>
          </div>
        </div>
        <div class="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Item Name</label>
              <input type="text" value="${item.name}" onchange="updateMenuItem(${index}, 'name', this.value)" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm">
            </div>
            <!-- Category selection removed from admin dashboard -->
          </div>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Price (₱)</label>
              <input type="number" value="${item.price}" min="1" max="9999" onchange="updateMenuItem(${index}, 'price', parseInt(this.value))" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <div class="flex space-x-2">
                <button type="button" onclick="updateMenuItem(${index}, 'available', true)" class="flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${item.available ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}">
                  Available
                </button>
                <button type="button" onclick="updateMenuItem(${index}, 'available', false)" class="flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${!item.available ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}">
                  Sold Out
                </button>
              </div>
            </div>
          </div>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea rows="4" value="${item.description}" onchange="updateMenuItem(${index}, 'description', this.value)" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm resize-none">${item.description}</textarea>
            </div>
          </div>
        </div>
      </div>
    `;
    container.appendChild(menuCard);
  });
}

function updateMenuItem(index, field, value) {
  currentMenuItems[index][field] = value;
  updateMenuStats();
  
  if (field === 'available') {
    renderMenuManagement();
  }
}

function removeMenuItem(index) {
  showDeleteConfirmation(index);
}

function addNewMenuItem() {
  showAddMenuItemModal();
}

function showAddMenuItemModal() {
  const modal = document.createElement('div');
  modal.className = 'modal active';
  modal.id = 'addMenuItemModal';
  modal.innerHTML = `
    <div class="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
      <div class="header-gradient text-white p-6 rounded-t-2xl">
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-bold">Add New Menu Item</h2>
          <button onclick="closeAddMenuItemModal()" class="text-white hover:text-gray-200 transition-colors">
            <div class="w-6 h-6 flex items-center justify-center">
              <i class="ri-close-line ri-lg"></i>
            </div>
          </button>
        </div>
      </div>
      <div class="p-6">
        <form id="addMenuItemForm" class="space-y-6">
          <div class="text-center">
            <div class="relative inline-block">
              <div id="newItemImagePreview" class="w-32 h-24 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:border-primary transition-colors" onclick="selectNewItemImage()">
                <div class="text-center">
                  <i class="ri-image-add-line text-gray-400 ri-2x mb-2"></i>
                  <p class="text-sm text-gray-500">Upload Image</p>
                </div>
              </div>
              <input type="file" id="newItemImageInput" accept="image/*" class="hidden" onchange="previewNewItemImage(event)">
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Item Name</label>
              <input type="text" id="newItemName" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="Enter item name" required>
            </div>
            <!-- Category selection removed from add new menu item modal -->
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Price (₱)</label>
              <input type="number" id="newItemPrice" min="1" max="9999" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="0" required>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <div class="flex space-x-2">
                <button type="button" id="newItemAvailable" onclick="setNewItemStatus(true)" class="flex-1 px-4 py-3 rounded-lg text-sm font-medium transition-all bg-green-500 text-white">
                  Available
                </button>
                <button type="button" id="newItemSoldOut" onclick="setNewItemStatus(false)" class="flex-1 px-4 py-3 rounded-lg text-sm font-medium transition-all bg-gray-200 text-gray-700 hover:bg-gray-300">
                  Sold Out
                </button>
              </div>
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea id="newItemDescription" rows="4" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none" placeholder="Describe your menu item..." required></textarea>
          </div>
          <div class="flex justify-end space-x-4">
            <button type="button" onclick="closeAddMenuItemModal()" class="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors whitespace-nowrap">
              Cancel
            </button>
            <button type="submit" class="header-gradient text-white px-6 py-3 !rounded-button font-medium hover:opacity-90 transition-opacity whitespace-nowrap">
              Add Menu Item
            </button>
          </div>
        </form>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
}

let newItemStatus = true;
let newItemImageSrc = '';

function setNewItemStatus(available) {
  newItemStatus = available;
  const availableBtn = document.getElementById('newItemAvailable');
  const soldOutBtn = document.getElementById('newItemSoldOut');
  if (available) {
    availableBtn.className = 'flex-1 px-4 py-3 rounded-lg text-sm font-medium transition-all bg-green-500 text-white';
    soldOutBtn.className = 'flex-1 px-4 py-3 rounded-lg text-sm font-medium transition-all bg-gray-200 text-gray-700 hover:bg-gray-300';
  } else {
    availableBtn.className = 'flex-1 px-4 py-3 rounded-lg text-sm font-medium transition-all bg-gray-200 text-gray-700 hover:bg-gray-300';
    soldOutBtn.className = 'flex-1 px-4 py-3 rounded-lg text-sm font-medium transition-all bg-red-500 text-white';
  }
}

function selectNewItemImage() {
  document.getElementById('newItemImageInput').click();
}

function previewNewItemImage(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      newItemImageSrc = e.target.result;
      const preview = document.getElementById('newItemImagePreview');
      preview.innerHTML = `<img src="${e.target.result}" class="w-full h-full object-cover rounded-lg">`;
    };
    reader.readAsDataURL(file);
  }
}

function closeAddMenuItemModal() {
  const modal = document.getElementById('addMenuItemModal');
  if (modal) {
    document.body.removeChild(modal);
    newItemImageSrc = '';
    newItemStatus = true;
  }
}

function updateMenuStats() {
  const totalItems = currentMenuItems.length;
  const availableItems = currentMenuItems.filter(item => item.available).length;
  const soldOutItems = totalItems - availableItems;
  const avgPrice = totalItems > 0 ? Math.round(currentMenuItems.reduce((sum, item) => sum + item.price, 0) / totalItems) : 0;
  document.getElementById('totalMenuItems').textContent = totalItems;
  document.getElementById('availableMenuItems').textContent = availableItems;
  document.getElementById('soldOutMenuItems').textContent = soldOutItems;
  document.getElementById('avgMenuPrice').textContent = avgPrice;
}

function toggleMenuVisibility() {
  const toggle = document.getElementById('menuVisibilityToggle');
  const isChecked = toggle.checked;
  toggle.checked = !isChecked;
  const toggleBg = toggle.nextElementSibling;
  const toggleDot = toggleBg.nextElementSibling;
  if (!isChecked) {
    toggleBg.classList.remove('bg-primary');
    toggleBg.classList.add('bg-gray-300');
    toggleDot.style.transform = 'translateX(-16px)';
  } else {
    toggleBg.classList.remove('bg-gray-300');
    toggleBg.classList.add('bg-primary');
    toggleDot.style.transform = 'translateX(0)';
  }
}

function saveMenuChanges() {
  const stallId = parseInt(localStorage.getItem('currentStallId'));
  const stall = stalls.find(s => s.id === stallId);
  if (stall) {
    stall.menuCount = currentMenuItems.length;
  }
  showNotification('Menu changes saved successfully!', 'success');
  setTimeout(() => {
    closeMenuManagement();
  }, 1500);
}

function changeMenuItemImage(index) {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  input.onchange = function(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(event) {
        currentMenuItems[index].image = event.target.result;
        renderMenuManagement();
        showNotification('Image updated successfully!', 'success');
      };
      reader.readAsDataURL(file);
    }
  };
  input.click();
}

function changeItemImage(index) {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  input.onchange = function(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(event) {
        currentMenuItems[index].image = event.target.result;
        renderMenuManagement();
        showNotification('Image updated successfully!', 'success');
      };
      reader.readAsDataURL(file);
    }
  };
  input.click();
}

function renderFilteredMenuItems(filteredItems) {
  const container = document.getElementById('menuItemsContainer');
  container.innerHTML = '';
  filteredItems.forEach((item, originalIndex) => {
    const index = currentMenuItems.findIndex(menuItem => menuItem.id === item.id);
    const menuCard = document.createElement('div');
    menuCard.className = 'bg-gray-50 rounded-xl p-6 border border-gray-200 hover:border-primary transition-colors';
    menuCard.innerHTML = `
      <div class="flex items-start space-x-6">
        <div class="relative">
          <div class="relative group cursor-pointer" onclick="changeMenuItemImage(${index})">
            <img src="${item.image}" alt="${item.name}" class="w-24 h-16 rounded-lg object-cover object-top">
            <div class="absolute inset-0 bg-black bg-opacity-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <i class="ri-image-edit-line text-white ri-lg"></i>
            </div>
          </div>
          <div class="absolute -top-2 -right-2">
            <button onclick="removeMenuItem(${index})" class="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors">
              <div class="w-4 h-4 flex items-center justify-center">
                <i class="ri-close-line text-xs"></i>
              </div>
            </button>
          </div>
        </div>
        <div class="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Item Name</label>
              <input type="text" value="${item.name}" onchange="updateMenuItem(${index}, 'name', this.value)" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select onchange="updateMenuItem(${index}, 'category', this.value)" class="w-full px-4 py-2 pr-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm">
                <option value="Main Dish" ${item.category === 'Main Dish' ? 'selected' : ''}>Main Dish</option>
                <option value="Beverage" ${item.category === 'Beverage' ? 'selected' : ''}>Beverage</option>
                <option value="Snack" ${item.category === 'Snack' ? 'selected' : ''}>Snack</option>
                <option value="Dessert" ${item.category === 'Dessert' ? 'selected' : ''}>Dessert</option>
                <option value="Appetizer" ${item.category === 'Appetizer' ? 'selected' : ''}>Appetizer</option>
              </select>
            </div>
          </div>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Price (₱)</label>
              <input type="number" value="${item.price}" min="1" max="9999" onchange="updateMenuItem(${index}, 'price', parseInt(this.value))" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <div class="flex space-x-2">
                <button type="button" onclick="updateMenuItem(${index}, 'available', true)" class="flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${item.available ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}">
                  Available
                </button>
                <button type="button" onclick="updateMenuItem(${index}, 'available', false)" class="flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${!item.available ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}">
                  Sold Out
                </button>
              </div>
            </div>
          </div>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea rows="4" value="${item.description}" onchange="updateMenuItem(${index}, 'description', this.value)" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm resize-none">${item.description}</textarea>
            </div>
          </div>
        </div>
      </div>
    `;
    container.appendChild(menuCard);
  });
}

function uploadStallImage() {
  showNotification('Image upload feature will be available soon!', 'info');
}

function saveAllChanges() {
  const stallId = localStorage.getItem('currentStallId');
  if (stallId) {
    const stall = stalls.find(s => s.id === parseInt(stallId));
    if (stall) {
      stall.name = document.getElementById('adminStallName').value;
      stall.description = document.getElementById('adminStallDescription').value;
      stall.status = document.querySelector('input[name="stallStatus"]:checked').value;
    }
  }
  showNotification('All changes saved successfully!', 'success');
  updateStallCounts();
}

function logout() {
  localStorage.removeItem('adminAuth');
  showLogin();
}

// Menu search functionality
document.addEventListener('DOMContentLoaded', function() {
  const menuSearchInput = document.getElementById('menuSearchInput');
  if (menuSearchInput) {
    menuSearchInput.addEventListener('input', function(e) {
      const searchTerm = e.target.value.toLowerCase();
      const filteredItems = currentMenuItems.filter(item =>
        item.name.toLowerCase().includes(searchTerm) ||
        item.description.toLowerCase().includes(searchTerm) ||
        item.category.toLowerCase().includes(searchTerm)
      );
      renderFilteredMenuItems(filteredItems);
    });
  }
  
  // Add menu item form submission
  document.addEventListener('submit', function(e) {
    if (e.target.id === 'addMenuItemForm') {
      e.preventDefault();
      const name = document.getElementById('newItemName').value;
      const category = document.getElementById('newItemCategory').value;
      const price = parseInt(document.getElementById('newItemPrice').value);
      const description = document.getElementById('newItemDescription').value;

      if (!name || !price || !description) {
        showNotification('Please fill in all required fields', 'error');
        return;
      }

      const stallId = parseInt(localStorage.getItem('currentStallId'));
      const defaultImage = 'public/images/default-menu.png';
      const newItem = {
        id: Date.now(),
        name: name,
        description: description,
        price: price,
        available: newItemStatus,
        category: category,
        image: newItemImageSrc || defaultImage
      };
      
      currentMenuItems.push(newItem);
      renderMenuManagement();
      updateMenuStats();
      closeAddMenuItemModal();
      showNotification('Menu item added successfully!', 'success');
    }
  });
});
