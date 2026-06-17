import type { Metadata } from 'next';
import { FragranceProfileHero } from '@/components/fragrance-profile/hero';
import { ProfileContents } from '@/components/fragrance-profile/profile-contents';
import { SampleProfile } from '@/components/fragrance-profile/sample-profile';
import { ProfileTypes } from '@/components/fragrance-profile/profile-types';
import { CtaBand } from '@/components/fragrance-profile/cta-band';

export const metadata: Metadata = {
  title: 'Discover Your Fragrance Profile | Crafted Sprays',
  description: 'See what a personalised fragrance profile looks like.',
};

export default function FragranceProfilePage() {
  return (
    <>
      <FragranceProfileHero />
      <ProfileContents />
      <SampleProfile />
      <ProfileTypes />
      <CtaBand />
    </>
  );
}
