import { createClient } from '@/utils/supabase/server';
import Gallery from '@/components/Gallery';

export default async function GalleryPage() {
  const supabase = await createClient();
  const { data: albums } = await supabase
    .from('gallery')
    .select('*')
    .eq('is_published', true)
    .order('created_at', { ascending: false });

  return (
    <>
      <Gallery albums={albums || []} />
    </>
  );
}
