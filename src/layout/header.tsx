/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import Logo from '@/assets/logo.svg';
import './header.less';
import { useNavigate, useLocation } from 'react-router-dom';
import cls from 'classnames';

export const LayoutHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activePath, setActivePath] = useState<string>('');

  useEffect(() => {
    setActivePath(location.pathname);
  }, [location]);

  return (
    <div className="header">
      <div className="logo">
        <Logo />
        <div className="logo-name">Parrot Chat</div>
      </div>
      <div className="header-menu">
        <a
          className={cls('menu-link', {
            'is-active': activePath.includes('weekly'),
          })}
          href="/#/weekly"
        >
          周报生成
        </a>
        <a
          className={cls('menu-link', {
            'is-active': activePath.includes('rewrite'),
          })}
          href="/#/rewrite"
        >
          文章改写
        </a>
        <a
          className={cls('menu-link', {
            'is-active': activePath.includes('abstract'),
          })}
          href="/#/abstract"
        >
          文章摘要
        </a>
        <a
          className={cls('menu-link', {
            'is-active': activePath.includes('email'),
          })}
          href="/#/email"
        >
          邮件帮写
        </a>
      </div>
      {/* <div className="search-bar">
        <input type="text" placeholder="Search" />
      </div> */}
      <div className="header-profile">
        <div className="notification">
          <span className="notification-number">3</span>
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-bell"
          >
            <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" />
          </svg>
        </div>
        <svg viewBox="0 0 512 512" fill="currentColor">
          <path d="M448.773 235.551A135.893 135.893 0 00451 211c0-74.443-60.557-135-135-135-47.52 0-91.567 25.313-115.766 65.537-32.666-10.59-66.182-6.049-93.794 12.979-27.612 19.013-44.092 49.116-45.425 82.031C24.716 253.788 0 290.497 0 331c0 7.031 1.703 13.887 3.006 20.537l.015.015C12.719 400.492 56.034 436 106 436h300c57.891 0 106-47.109 106-105 0-40.942-25.053-77.798-63.227-95.449z" />
        </svg>
        <img
          className="profile-img"
          src="https://images.unsplash.com/photo-1600353068440-6361ef3a86e8?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
          alt=""
        />
      </div>
    </div>
  );
};
