export interface NavItem {
    name: string;
    route?: string;
    icon?: string;
    children?: NavItem[];
}

export const leftMenuNavItems: NavItem[] = [
    { 
        name: "Admin",
        icon: 'settings',
        children: [
            {
                name: 'Roles',
                route: 'roles',
                icon: 'dangerous'
            },
            {
                name: 'Users',
                route: 'users',
                icon: 'supervised_user_circle'
            }
        ]
    }, 
    {
        name: 'Owner',
        icon: 'work',
        children: [
            {
                name: 'My places',
                route: 'entertainment-places', 
                icon: 'festival'
            },
            {
                name: 'Reservations',
                route: 'owner-reservations', 
                icon: 'book_online'
            },
            {
                name: 'Statistics',
                route: 'statistics',
                icon: 'insights'
            }
        ]
    },
    {
        name: 'Renter',
        icon: 'face',
        children: [
            {
                name: 'Entertainment Places',
                route: '',
                icon: 'festival',
            },
            {
                name: 'My reservations',
                route: 'renter-reservations',
                icon: 'bookmarks'
            }
        ]
    }
];