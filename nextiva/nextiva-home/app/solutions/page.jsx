import { HubPage } from '../../components/landing/LandingPage';
import { HUBS } from '../../content/landingPages';

export const metadata = {
  title: 'Solutions | UCaaS',
  description: HUBS.solutions.lede,
};

export default function SolutionsHub() {
  return <HubPage hubKey="solutions" />;
}
