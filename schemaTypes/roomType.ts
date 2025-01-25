import { defineType, defineField } from 'sanity';

export const room = defineType({
  name: 'room',
  title: 'Kamar',
  type: 'document',
  fields: [
    // Basic Details
    defineField({
      name: 'roomName',
      title: 'Nama Kamar',
      type: 'string',
      description: 'Nama kamar yang akan ditampilkan di halaman kamar.',
      validation: (Rule) => Rule.required().min(3).max(100).error('Nama kamar harus antara 3-100 karakter.'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'roomName', maxLength: 96 },
      description: 'Slug untuk URL halaman kamar.',
    }),
    defineField({
      name: 'description',
      title: 'Deskripsi',
      type: 'text',
      description: 'Deskripsi lengkap tentang kamar, fasilitas, dan kelebihannya.',
      validation: (Rule) => Rule.required().min(10).max(500).error('Deskripsi harus antara 10-500 karakter.'),
    }),
    defineField({
      name: 'price',
      title: 'Harga',
      type: 'string',
      description: 'Harga per malam atau tarif kamar.',
      validation: (Rule) => Rule.required().regex(/^\d+$/, { name: 'Harga', invert: false }).error('Harga harus berupa angka.'),
    }),
    defineField({
      name: 'guestsBooked',
      title: 'Jumlah Reservasi',
      type: 'number',
      description: 'Jumlah pengunjung yang pernah menginap atau melakukan reservasi.',
      validation: (Rule) => Rule.required().min(0).error('Jumlah reservasi tidak bisa kurang dari 0.'),
    }),

    defineField({
      name: 'specifications',
      title: 'Spesifikasi Kamar',
      description: 'Cantumkan detail dan spesifikasi kamar (contoh: jumlah kamar, ranjang, kamar mandi, kapasitas tamu, dan ukuran ruangan)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Nama Spesifikasi',
              type: 'string',
              description: 'Nama atau judul dari spesifikasi kamar.',
            }),
            defineField({
              name: 'icon',
              title: 'Ikon/Gambar',
              type: 'image',
              options: { hotspot: true },
              description: 'Ikon atau gambar yang mewakili spesifikasi kamar.',
            }),
          ],
          preview: {
            select: {
              title: 'name',
              media: 'icon',
            },
          },
        },
      ],
    }),

    // Facilities with Images
    defineField({
      name: 'facilities',
      title: 'Fasilitas',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Nama Fasilitas',
              type: 'string',
              description: 'Nama fasilitas yang tersedia di kamar.',
            }),
            defineField({
              name: 'icon',
              title: 'Ikon/Gambar',
              type: 'image',
              options: { hotspot: true },
              description: 'Ikon atau gambar yang mewakili fasilitas kamar.',
            }),
          ],
          preview: {
            select: {
              title: 'name',
              media: 'icon',
            },
          },
        },
      ],
      description: 'Daftar fasilitas dengan ikon atau gambar untuk kamar ini.',
    }),

    // Address and Map
    defineField({
      name: 'address',
      title: 'Alamat',
      type: 'string',
      description: 'Alamat lengkap tempat kamar berada.',
    }),
    defineField({
      name: 'gmapUrl',
      title: 'URL Google Maps',
      type: 'url',
      description: 'URL untuk menampilkan lokasi kamar di Google Maps.',
    }),

    // Rules and Policies (Individual Fields)
    defineField({
      name: 'checkIn',
      title: 'Jam Check-In',
      type: 'string',
      description: 'Waktu check-in untuk kamar, misalnya: 14:00 WIB.',
    }),
    defineField({
      name: 'checkOut',
      title: 'Jam Check-Out',
      type: 'string',
      description: 'Waktu check-out untuk kamar, misalnya: 11:00 WIB.',
    }),
    defineField({
      name: 'rulesList',
      title: 'Daftar Aturan',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Aturan-aturan khusus untuk kamar yang harus diikuti oleh pengunjung.',
    }),
    defineField({
      name: 'disclaimer',
      title: 'Penafian',
      type: 'text',
      description: 'Tambahkan penafian atau kebijakan tambahan jika diperlukan.',
    }),

    // Extra Amenities
    defineField({
      name: 'extraAmenities',
      title: 'Fasilitas Tambahan',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Nama Fasilitas Tambahan',
              type: 'string',
              description: 'Nama fasilitas tambahan yang tersedia.',
            }),
            defineField({
              name: 'price',
              title: 'Harga',
              type: 'string',
              description: 'Harga fasilitas tambahan tersebut.',
            }),
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'price',
            },
          },
        },
      ],
      description: 'Fasilitas tambahan yang dapat ditambahkan ke dalam kamar beserta harga.',
    }),

    // Booking Methods
    defineField({
      name: 'bookingMethod',
      title: 'Metode Pemesanan',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'platform',
              title: 'Platform',
              type: 'string',
              options: {
                list: [
                  { title: 'Whatsapp', value: 'Whatsapp' },
                  { title: 'AirBNB', value: 'Airbnb' },
                  { title: 'Booking.com', value: 'Booking-com' },
                  { title: 'Tiket.com', value: 'Tiket-com' },
                  { title: 'Agoda', value: 'Agoda' },
                  { title: 'Trip.com', value: 'Trip-com' },
                  { title: 'Traveloka', value: 'Traveloka' },
                ],
              },
              validation: Rule => Rule.required().error('Platform wajib diisi'),
            },
            {
              name: 'link',
              title: 'Link',
              type: 'url',
              description: 'URL untuk melakukan pemesanan di platform yang dipilih.',
              validation: Rule => Rule.required().uri().error('Link wajib diisi dan valid'),
            },
          ],
        },
      ],
      description: 'Daftar metode pemesanan dengan platform dan link terkait.',
    }),

    // Main Image and Gallery
    defineField({
      name: 'image',
      title: 'Gambar Utama',
      type: 'image',
      description: 'Gambar utama yang digunakan untuk kamar.',
      options: { hotspot: true },
      validation: Rule => Rule.required().error('Gambar utama wajib diisi'),
    }),
    defineField({
      name: 'gallery',
      title: 'Galeri Gambar',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true }, // Memastikan setiap gambar di dalam array bisa menggunakan hotspot secara individu
        },
      ],
      description: 'Gambar tambahan untuk menampilkan kamar dari berbagai sudut.',
      validation: Rule => Rule.required().min(1).error('Galeri gambar wajib diisi dengan minimal satu gambar'),
    }),
  ],
});
