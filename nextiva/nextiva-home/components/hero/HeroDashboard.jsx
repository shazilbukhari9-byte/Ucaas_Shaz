'use client';

import { useState } from 'react';
import HeroChatThread from './HeroChatThread';

// Phone-only switcher: the three panels can't share a 375px screen at a
// readable size, so on phones (styles/46-landing.css) one shows at a time.
const MOBILE_VIEWS = [
  { id: 'list', label: 'Chats', icon: 'ri-chat-3-line' },
  { id: 'chat', label: 'Conversation', icon: 'ri-message-2-line' },
  { id: 'info', label: 'Customer', icon: 'ri-user-3-line' },
];

/**
 * The desktop app window from the home hero — chat sidebar, live thread and
 * customer info panel. Extracted so other pages can render exactly the same
 * dashboard; home renders this component in the same spot as before.
 *
 * Its styles are scoped under `.section-hero .hero-showcase`, so any host
 * must provide those ancestors (see EmbeddedHeroDashboard for embedding it
 * outside the home hero).
 */
const HOME_CUSTOMER = {
  initials: 'RK',
  name: 'Rohit Kalra',
  email: 'rohit@brightlane.io',
  tags: ['Priority', 'Growth'],
  activity: [
    { icon: 'ri-phone-fill', text: 'Call – 12 min', time: 'Yesterday' },
    { icon: 'ri-mail-fill', text: 'Email opened', time: '2 days ago' },
    { icon: 'ri-calendar-check-fill', text: 'Meeting booked', time: '1 week ago' },
  ],
  preview: 'Porting the rest across this week',
  assignee: { initials: 'PS', name: 'Priya Sharma', role: 'Account manager', status: 'Online' },
  note: 'Ten lines live on the Growth plan. Porting the remaining numbers this week — send the porting form before Friday.',
};

/**
 * `customer` swaps the Customer Info panel's record and the open conversation
 * in the sidebar; `thread` swaps the chat itself (see HeroChatThread). Home
 * renders the defaults for both, so the shared dashboard is not showing an
 * identical customer — or running an identical conversation — everywhere.
 */
export default function HeroDashboard({ customer = HOME_CUSTOMER, thread }) {
  const [view, setView] = useState('chat');
  return (
                            <div className="desktop-app-bg">
                                <div className="desktop-app-window">
                                    <div className="app-mobile-tabs" role="tablist" aria-label="Dashboard panel">
                                        {MOBILE_VIEWS.map((v) => (
                                            <button key={v.id} type="button" role="tab" aria-selected={view === v.id} className={view === v.id ? 'is-on' : ''} onClick={() => setView(v.id)}>
                                                <i className={v.icon} aria-hidden="true"></i>{v.label}
                                            </button>
                                        ))}
                                    </div>
                                    <div className={`app-body app-body--${view}`}>
                                        <div className="app-sidebar">
                                            <div className="sidebar-header">
                                                <span className="sidebar-title">Chat</span>
                                                <div className="sidebar-actions">
                                                    <button className="sidebar-icon-btn" type="button" aria-label="New chat"><i className="ri-add-line"></i></button>
                                                    <button className="sidebar-icon-btn" type="button" aria-label="Filter"><i className="ri-filter-3-line"></i></button>
                                                </div>
                                            </div>

                                            <div className="sidebar-tabs">
                                                <button className="sidebar-tab active" type="button">All</button>
                                                <button className="sidebar-tab" type="button">Team</button>
                                                <button className="sidebar-tab" type="button">Direct</button>
                                                <button className="sidebar-tab" type="button">Favorites</button>
                                            </div>

                                            <div className="sidebar-filters">
                                                <span className="sidebar-search"><i className="ri-search-line"></i>Search&#8230;</span>
                                                <span className="sidebar-select">All <i className="ri-arrow-down-s-line"></i></span>
                                            </div>

                                            <span className="sidebar-group-label">Team</span>

                                            <div className="conversation-list">
                                                <div className="conversation-item">
                                                    <div className="conversation-avatar brand-a"><span>MT</span></div>
                                                    <div className="conversation-info">
                                                        <span className="conversation-name">test media team <i className="ri-pushpin-line pin"></i></span>
                                                        <span className="conversation-preview">Call Logs</span>
                                                    </div>
                                                    <span className="conversation-time">Aug 7</span>
                                                </div>
                                                <div className="conversation-item">
                                                    <div className="conversation-avatar brand-b"><span>Z</span></div>
                                                    <div className="conversation-info">
                                                        <span className="conversation-name">test new 001 edit <i className="ri-pushpin-line pin"></i></span>
                                                        <span className="conversation-preview">Text edited</span>
                                                    </div>
                                                    <span className="conversation-time">Jun 16</span>
                                                </div>
                                                <div className="conversation-item">
                                                    <div className="conversation-avatar brand-c"><span>D</span></div>
                                                    <div className="conversation-info">
                                                        <span className="conversation-name">dcas</span>
                                                        <span className="conversation-preview">Ramandeep Kaur added Shahid Mohd an&#8230;</span>
                                                    </div>
                                                    <span className="conversation-time">Aug 11</span>
                                                </div>
                                                <div className="conversation-item active">
                                                    <div className="conversation-avatar brand-d"><span>{customer.initials}</span></div>
                                                    <div className="conversation-info">
                                                        <span className="conversation-name">{customer.name}</span>
                                                        <span className="conversation-preview">{customer.preview}</span>
                                                    </div>
                                                    <span className="conversation-time">2m</span>
                                                </div>
                                                <div className="conversation-item">
                                                    <div className="conversation-avatar brand-e"><span>T2</span></div>
                                                    <div className="conversation-info">
                                                        <span className="conversation-name">test 222</span>
                                                        <span className="conversation-preview">Call Logs</span>
                                                    </div>
                                                    <span className="conversation-time">Jul 22</span>
                                                </div>
                                            </div>
                                        </div>


                                        <HeroChatThread thread={thread} />

                                        <div className="app-customer-panel">
                                            <div className="customer-panel-header">
                                                <span className="customer-panel-title">Customer Info</span>
                                                <div className="customer-panel-action"><i className="ri-more-2-fill"></i></div>
                                            </div>
                                            <div className="customer-profile">
                                                {/* Initials instead of a stock portrait — no likeness rights
                                                    attached to a fabricated customer record. */}
                                                <div className="customer-avatar customer-avatar--initials">
                                                    <span>{customer.initials}</span>
                                                </div>
                                                <div className="customer-name">{customer.name}</div>
                                                <div className="customer-email">{customer.email}</div>
                                                <div className="customer-tags">
                                                    <span className="customer-tag">{customer.tags[0]}</span>
                                                    <span className="customer-tag">{customer.tags[1]}</span>
                                                </div>
                                            </div>
                                            <div className="customer-section">
                                                <div className="customer-section-title"><i className="ri-time-line"></i> Recent Activity</div>
                                                <div className="customer-activity-list">
                                                    {customer.activity.map((item) => (
                                                        <div className="activity-item" key={item.text}>
                                                            <span className="activity-icon"><i className={item.icon}></i></span>
                                                            <span className="activity-text">{item.text}</span>
                                                            <span className="activity-time">{item.time}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="customer-section">
                                                <div className="customer-section-title"><i className="ri-folder-line"></i> Shared</div>
                                                <div className="customer-shared-row">
                                                    <div className="customer-shared-item">
                                                        <span className="activity-icon"><i className="ri-image-fill"></i></span>
                                                        <span className="customer-shared-label">Media</span>
                                                    </div>
                                                    <div className="customer-shared-item">
                                                        <span className="activity-icon"><i className="ri-file-3-fill"></i></span>
                                                        <span className="customer-shared-label">Files</span>
                                                    </div>
                                                    <div className="customer-shared-item">
                                                        <span className="activity-icon"><i className="ri-link"></i></span>
                                                        <span className="customer-shared-label">Links</span>
                                                    </div>
                                                    <div className="customer-shared-item">
                                                        <span className="activity-icon"><i className="ri-phone-fill"></i></span>
                                                        <span className="customer-shared-label">Calls</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="customer-section">
                                                <div className="customer-section-title"><i className="ri-user-star-line"></i> Assigned to</div>
                                                <div className="customer-assignee">
                                                    <span className="customer-assignee-avatar">{customer.assignee.initials}</span>
                                                    <span className="customer-assignee-info">
                                                        <span className="customer-assignee-name">{customer.assignee.name}</span>
                                                        <span className="customer-assignee-role">{customer.assignee.role}</span>
                                                    </span>
                                                    <span className="customer-assignee-status">{customer.assignee.status}</span>
                                                </div>
                                            </div>
                                            <div className="customer-section">
                                                <div className="customer-section-title"><i className="ri-sticky-note-line"></i> Notes</div>
                                                <p className="customer-note">{customer.note}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
  );
}
