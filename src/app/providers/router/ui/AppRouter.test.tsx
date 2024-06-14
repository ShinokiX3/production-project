import { screen } from '@testing-library/react';
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import AppRouter from './AppRouter';
import {
    getRouteAbout,
    getRouteAdminPanel,
    getRouteProfile,
} from '@/shared/const/router';
import { UserRole } from '@/entities/User';

describe('app/router/AppRouter', () => {
    test('Page should render', async () => {
        componentRender(<AppRouter />, {
            route: getRouteAbout(),
        });

        const page = await screen.findByTestId('AboutPage');
        expect(page).toBeInTheDocument();
    });

    test('Page should not found', async () => {
        componentRender(<AppRouter />, {
            route: '/not-existed-route',
        });

        const page = await screen.findByTestId('NotFoundPage');
        expect(page).toBeInTheDocument();
    });

    test('Unauthorized should redirect to MainPage', async () => {
        componentRender(<AppRouter />, {
            route: getRouteProfile('1'),
        });

        const page = await screen.findByTestId('MainPage');
        expect(page).toBeInTheDocument();
    });

    // test('Authorized with permission should access to ProfilePage', async () => {
    // 	componentRender(<AppRouter />, {
    // 		route: getRouteProfile('1'),
    // 		initialState: {
    // 			user: {
    // 				_inited: true,
    // 				authData: {
    // 					id: '1',
    // 					roles: [UserRole.USER],
    // 				}
    // 			},
    // 		}
    // 	});

    // 	await waitFor(() => {
    // 		expect(screen.queryByTestId('PageLoader')).not.toBeInTheDocument();
    // 	});

    // 	const page = await screen.findByTestId('ProfilePage');
    // 	expect(page).toBeInTheDocument();
    // });

    test('Authorized when have not permission should redirect to ForbiddenPage', async () => {
        componentRender(<AppRouter />, {
            route: getRouteAdminPanel(),
            initialState: {
                user: { _inited: true, authData: {} },
            },
        });

        const page = await screen.findByTestId('ForbiddenPage');
        expect(page).toBeInTheDocument();
    });

    test('Authorized with permission (role = admin) should access to AdminPanelPage', async () => {
        componentRender(<AppRouter />, {
            route: getRouteAdminPanel(),
            initialState: {
                user: {
                    _inited: true,
                    authData: {
                        roles: [UserRole.ADMIN],
                    },
                },
            },
        });

        const page = await screen.findByTestId('AdminPanelPage');
        expect(page).toBeInTheDocument();
    });
});
