const data = [
  {
    label: 'Home',
    type: 'group',
    role: 'admin bkpsdm,admin skpd,user',
  },
  [
    {
      to: '/',
      icon: 'desktop-mac',
      label: 'Dashboard',
    },
  ],
  {
    label: 'Menu',
    type: 'group',
    role: 'admin bkpsdm,admin skpd',
  },
  [
    {
      to: '/pegawai/table',
      label: 'Pegawai JFU',
      icon: 'account',
      updateMark: false,
      role: 'admin bkpsdm,analis jabatan',
    },
    {
      to: '/pengajuan/table',
      label: 'Pengajuan',
      icon: 'table',
      updateMark: false,
      role: 'admin bkpsdm,admin skpd,user,analis jabatan,pengawas,administrator 1,administrator 2,jpt',
    },
    {
      to: '/surat/keputusan/table',
      label: 'Surat Keputusan',
      icon: 'table',
      updateMark: false,
      role: 'admin bkpsdm,admin skpd,analis jabatan',
    },
    {
      label: 'Pengaturan',
      subLabel: 'Setting',
      icon: 'settings',
      role: 'admin bkpsdm,analis jabatan',
      menu: [
        {
          to: '/syarat/pengajuan/table',
          label: 'Syarat Pengajuan',
          icon: 'puzzle',
          updateMark: false,
          role: 'admin bkpsdm,analis jabatan',
        },
        {
          to: '/jenis/jafung/table',
          label: 'Jenis Jafung',
          icon: 'puzzle',
          updateMark: false,
          role: 'admin bkpsdm,analis jabatan',
        },
        {
          to: '/template/surat/table',
          label: 'Template Surat',
          icon: 'puzzle',
          updateMark: false,
          role: 'admin bkpsdm,analis jabatan',
        },
        {
          to: '/users/table',
          label: 'Users',
          icon: 'account-multiple',
          updateMark: false,
          role: 'admin bkpsdm,analis jabatan',
        },
      ],
    },
  ],
  {
    label: 'About',
    type: 'group',
    role: 'admin bkpsdm',
  },
  [
    {
      href: 'https://justboil.me/bulma-admin-template/null-nuxt',
      label: 'About',
      icon: 'help-circle',
      role: 'admin bkpsdm',
    },
  ],
]
export default data
