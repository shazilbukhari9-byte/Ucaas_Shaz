import { Shell } from '../../components/landing/LandingPage';
import ContactSalesPage from '../../components/contact/ContactSalesPage';
import { CONTACT } from '../../content/contactSales';

export const metadata = {
  title: CONTACT.meta.title,
  description: CONTACT.meta.description,
};

export default function ContactSales() {
  return (
    <Shell>
      <ContactSalesPage />
    </Shell>
  );
}
