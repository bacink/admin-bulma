const data = [
  'General',
  [
    {
      to: '/',
      icon: 'desktop-mac',
      label: 'Dashboard',
    },
  ],
  'Menu',
  [
    {
      to: '/tables',
      label: 'Tables',
      icon: 'table',
      updateMark: false,
    },
    {
      to: '/pengajuan/table',
      label: 'Pengajuan',
      icon: 'table',
      updateMark: false,
    },
    {
      label: 'Pengaturan',
      subLabel: 'Setting',
      icon: 'settings',
      menu: [
        {
          to: '/syarat-pengajuan/table',
          label: 'Syarat Pengajuan',
          icon: 'puzzle',
          updateMark: false,
        },
        {
          to: '/jenis-jafung/table',
          label: 'Jenis Jafung',
          icon: 'puzzle',
          updateMark: false,
        },
      ],
    },
  ],
  'About',
  [
    {
      href: 'https://justboil.me/bulma-admin-template/null-nuxt',
      label: 'About',
      icon: 'help-circle',
    },
  ],
]
export default data
