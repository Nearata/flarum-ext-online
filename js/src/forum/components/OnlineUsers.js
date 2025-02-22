import Component from 'flarum/common/Component';
import avatar from 'flarum/common/helpers/avatar';
import username from 'flarum/common/helpers/username';
import Link from 'flarum/common/components/Link';

import OnlineState from '../states/OnlineState';

export default class OnlineUsers extends Component {
    oninit() {
        if (!app.onlineState) {
            app.onlineState = new OnlineState();
        }

        this.more = app.onlineState.isMore() ? app.onlineState.getMore() : null;
    }

    view() {
        return [
            m('.OnlineUsers', [
                m('.OnlineUsers-title', app.forum.attribute('antoinefr-online.titleoflist')),
                m('.OnlineUsers-list', [
                    app.onlineState.users.map(user => {
                        return m('.OnlineUsers-item', [
                            m(Link, {
                                href: app.route.user(user),
                                title: user.displayName()
                            }, [
                                avatar(user, { className: 'OnlineUsers-avatar' }),
                                username(user, { className: 'OnlineUsers-username' })
                            ])
                        ]);
                    })
                ]),
                this.more ? [
                    m('.OnlineUsers-more', [
                        app.onlineState.users.length > 0 ? [
                            m('p', app.translator.trans('antoinefr-online.forum.andmore', { more: this.more }))
                        ] : [
                            m('p', app.translator.transChoice('antoinefr-online.forum.online_users', this.more, { more: this.more }))
                        ]
                    ])
                ] : null
            ])
        ];
    }
}
