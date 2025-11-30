// Stall data

const stalls = [
  { id: 1, name: "Ash-Min's", menuCount: 10, description: 'Filipino favorites and comfort meals', status: 'open', rating: 4.5, phone: '0910-000-0001', email: 'ashmins@foodhub.local', location: 'Located at Ground Floor, Albert Einstein Building', image: 'public/images/stall1.jpg' },
  { id: 2, name: 'Cafe Aromatiko', menuCount: 48, description: 'Offers frappes, coffee, and milk tea', status: 'open', rating: 4.8, phone: '0910-000-0002', email: 'aromatiko@foodhub.local', location: 'Located at Ground Floor, Albert Einstein Building', image: 'public/images/stall2.jpg' },
  { id: 3, name: 'Chowking', menuCount: 10, description: 'Filipino-Chinese fast-food meals', status: 'open', rating: 4.2, phone: '0910-000-0003', email: 'chowking@foodhub.local', location: 'Located at Ground Floor, Albert Einstein Building', image: 'public/images/stall3.jpg' },
  { id: 4, name: 'Fried Noodles Haus', menuCount: 8, description: 'Specializes in fried noodles', status: 'open', rating: 4.1, phone: '0910-000-0004', email: 'friednoodles@foodhub.local', location: 'Located at Ground Floor, Albert Einstein Building', image: 'public/images/stall4.jpg' },
  { id: 5, name: "Gian's Buko Juice", menuCount: 4, description: 'Fresh buko juice and shakes', status: 'open', rating: 4.4, phone: '0910-000-0005', email: 'gianbuko@foodhub.local', location: 'Located at Ground Floor, Albert Einstein Building', image: 'public/images/stall5.jpg' },
  { id: 6, name: 'ITSNOK Binalot', menuCount: 6, description: 'Traditional wrapped rice meals', status: 'open', rating: 4.0, phone: '0910-000-0006', email: 'itsnok@foodhub.local', location: 'Located at Ground Floor, Albert Einstein Building', image: 'public/images/stall6.jpg' },
  { id: 7, name: 'Juice Bar', menuCount: 10, description: 'Juices and palamig drinks', status: 'open', rating: 4.3, phone: '0910-000-0007', email: 'juicebar@foodhub.local', location: 'Located at Ground Floor, Albert Einstein Building', image: 'public/images/stall7.jpg' },
  { id: 8, name: "Julie's Bakeshop", menuCount: 10, description: 'Fresh breads and pastries', status: 'open', rating: 4.2, phone: '0910-000-0008', email: 'julies@foodhub.local', location: 'Located at Ground Floor, Albert Einstein Building', image: 'public/images/stall8.jpg' },
  { id: 9, name: 'Little Tokyo Takoyaki', menuCount: 8, description: 'Japanese-style takoyaki', status: 'open', rating: 4.5, phone: '0910-000-0009', email: 'littletokyo@foodhub.local', location: 'Located at Ground Floor, Albert Einstein Building', image: 'public/images/stall9.jpg' },
  { id: 10, name: 'Potato Corner', menuCount: 12, description: 'Flavored fries and snacks', status: 'open', rating: 4.0, phone: '0910-000-0010', email: 'potatocorner@foodhub.local', location: 'Located at Ground Floor, Albert Einstein Building', image: 'public/images/stall10.jpg' },
  { id: 11, name: 'RC Beef Shawarma', menuCount: 4, description: 'Shawarma rice and pita wraps', status: 'open', rating: 4.1, phone: '0910-000-0011', email: 'rcshawarma@foodhub.local', location: 'Located at Ground Floor, Albert Einstein Building', image: 'public/images/stall11.jpg' },
  { id: 12, name: "RR Sorella's", menuCount: 30, description: 'Pizza and Italian snacks', status: 'open', rating: 4.6, phone: '0910-000-0012', email: 'rrsorellas@foodhub.local', location: 'Located at Ground Floor, Albert Einstein Building', image: 'public/images/stall12.jpg' },
  { id: 13, name: 'Spot-G Food Hub', menuCount: 24, description: 'Simple lutong-bahay meals.', status: 'open', rating: 4.0, phone: '0910-000-0013', email: 'spotg@foodhub.local', location: 'Located at Ground Floor, Albert Einstein Building', image: 'public/images/stall13.jpg' },
  { id: 14, name: 'Tender Juicy Hotdogs', menuCount: 12, description: 'Hotdog sandwiches', status: 'open', rating: 4.1, phone: '0910-000-0014', email: 'tenderjuicy@foodhub.local', location: 'Located at Ground Floor, Albert Einstein Building', image: 'public/images/tender juicy/TENDER_JUICY_HOTDOG_logo.jpg'},
  { id: 15, name: 'Theatery', menuCount: 24, description: 'Filipino lutong-bahay meals', status: 'open', rating: 4.4, phone: '0910-000-0015', email: 'theatery@foodhub.local', location: 'Located at Ground Floor, Albert Einstein Building', image: 'public/images/stall15.jpg' },
  { id: 16, name: 'Waffle Time', menuCount: 11, description: 'Freshly cooked waffles', status: 'open', rating: 4.3, phone: '0910-000-0016', email: 'waffletime@foodhub.local', location: 'Block P', image: 'public/images/stall16.jpg' }
];

let showOpenOnly = false;

function loadStalls() {
  const grid = document.getElementById('stallsGrid');
  if (!grid) return;

  grid.innerHTML = '';

  const list = showOpenOnly ? stalls.filter(s => s.status === 'open') : stalls;

  list.forEach(stall => {
    const card = document.createElement('div');
    card.className = 'bg-white rounded-xl p-4 shadow hover:shadow-lg transition-shadow cursor-pointer';
    card.innerHTML = `
      <div class="flex flex-col h-full" onclick="showStallDetail(${stall.id})">
        <div class="h-40 w-full bg-gray-100 rounded-lg overflow-hidden mb-3">
          <img src="${stall.image}" alt="${stall.name}" class="w-full h-full object-cover object-center">
        </div>
        <div class="flex-1">
          <h3 class="text-lg font-bold text-gray-900">${stall.name}</h3>
          <p class="text-sm text-gray-600 truncate">${stall.description}</p>
        </div>
        <div class="mt-3 flex items-center justify-between">
          <span class="text-sm text-gray-700">${stall.menuCount} items</span>
          <span class="px-3 py-1 rounded-full text-xs font-medium ${stall.status === 'open' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}">${stall.status === 'open' ? 'Open' : 'Closed'}</span>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });

  updateStallCounts();
}

function toggleOpenOnly() {
  showOpenOnly = !showOpenOnly;
  loadStalls();
}

function updateStallCounts() {
  const openCountEl = document.getElementById('openStallsCount');
  if (openCountEl) {
    const openCount = stalls.filter(s => s.status === 'open').length;
    openCountEl.textContent = openCount;
  }
  // If there is an element with id totalStallsCount, update it; otherwise leave static text
  const totalEl = document.getElementById('totalStallsCount');
  if (totalEl) totalEl.textContent = stalls.length;
}

// Initialize on load if the page is already present
document.addEventListener('DOMContentLoaded', () => {
  loadStalls();
});
