// Supabase: social + news links for this client
const supabaseUrl = 'https://aowblircaymwuymcmllh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFvd2JsaXJjYXltd3V5bWNtbGxoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIzMzExMjcsImV4cCI6MjA2NzkwNzEyN30.qS7jxVwu83zEYMvxNo7C_2dtVrSZ6wYIFiNtoN69UkQ';
// Box 1 gave ' Angus Ni' (leading space). Match both forms so rows load either way.
const CLIENT_IDS = ['Angus Ni', ' Angus Ni'];

function renderLinks(containerId, rows) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = '';
  if (!rows || !rows.length) {
    container.innerHTML = '<span class="empty">No links yet.</span>';
    return;
  }
  rows.forEach(link => {
    const anchor = document.createElement('a');
    anchor.href = link.url;
    anchor.target = '_blank';
    anchor.rel = 'noopener noreferrer';
    anchor.title = link.name;
    const img = document.createElement('img');
    img.src = link.icon;
    img.alt = link.name;
    anchor.appendChild(img);
    container.appendChild(anchor);
  });
}

async function loadTable(client, table, containerId) {
  const { data, error } = await client.from(table).select('*').in('client_id', CLIENT_IDS);
  if (error) { console.error('Error loading ' + table + ':', error); return; }
  renderLinks(containerId, data);
}

document.addEventListener('DOMContentLoaded', () => {
  if (!document.getElementById('socialMediaList1')) return;
  if (!window.supabase) { console.error('Supabase library not loaded'); return; }
  const client = window.supabase.createClient(supabaseUrl, supabaseKey);
  loadTable(client, 'social_media', 'socialMediaList1');
  loadTable(client, 'news_links', 'socialMediaList2');
});
