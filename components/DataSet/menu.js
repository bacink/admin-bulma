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
      to: '/tables',
      label: 'Tables',
      icon: 'table',
      updateMark: false,
      role: 'admin bkpsdm',
    },
    {
      to: '/pengajuan/table',
      label: 'Pengajuan',
      icon: 'table',
      updateMark: false,
      role: 'admin bkpsdm,admin skpd,user,',
    },
    {
      label: 'Pengaturan',
      subLabel: 'Setting',
      icon: 'settings',
      role: 'admin bkpsdm',
      menu: [
        {
          to: '/syarat-pengajuan/table',
          label: 'Syarat Pengajuan',
          icon: 'puzzle',
          updateMark: false,
          role: 'admin bkpsdm',
        },
        {
          to: '/jenis-jafung/table',
          label: 'Jenis Jafung',
          icon: 'puzzle',
          updateMark: false,
          role: 'admin bkpsdm',
        },
        {
          to: '/users/table',
          label: 'Users',
          icon: 'account-multiple',
          updateMark: false,
          role: 'admin bkpsdm',
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
