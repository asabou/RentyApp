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
                route: 'my-entertainment-places', //sau all daca e admin
                icon: 'festival'
            },
            {
                name: 'Reservations',
                route: 'my-entertainment-places-reservations', //sau all daca e admin
                icon: 'book_online'
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
                route: 'my-reservations',
                icon: 'bookmarks'
            }
        ]
    }
];