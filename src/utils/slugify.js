export default function slugify(name) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // hapus karakter aneh
    .replace(/\s+/g, '-') // ganti spasi dengan -
    .replace(/--+/g, '-'); // hilangkan tanda - berlebih
}
