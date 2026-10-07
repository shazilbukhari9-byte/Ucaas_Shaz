import { HubPage } from '../../components/landing/LandingPage';
import { HUBS } from '../../content/landingPages';

export const metadata = {
  title: 'Features | UCaaS',
  description: HUBS.features.lede,
};

export default function FeaturesHub() {
  return <HubPage hubKey="features" />;
}
