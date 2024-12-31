// pages/purchases/index.js
import Link from 'next/link';

function PurchasesPage() {
  return (
    <div>
      <h1>Gestión de Compras</h1>
      <Link href="/purchases/form">
        <button>Registrar Compras</button>
      </Link>
    </div>
  );
}

export default PurchasesPage;
