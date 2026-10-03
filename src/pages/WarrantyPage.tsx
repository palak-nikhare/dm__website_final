import { useNavigate } from 'react-router-dom';
import { Warranty } from '@/components/Warranty';

export function WarrantyPage() {
  const navigate = useNavigate();

  return (
    <div className="pt-24">
      <Warranty onNavigateHome={() => navigate('/')} />
    </div>
  );
}
