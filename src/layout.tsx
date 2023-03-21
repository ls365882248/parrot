import React from 'react';

import { Layout, Menu } from '@arco-design/web-react';
import cs from 'classnames';
import { IconBug } from '@arco-design/web-react/icon';
import Navbar from './components/NavBar';
import { routes } from '@/routes';
import useLocale from './utils/useLocale';

import styles from './style/layout.module.less';

const MenuItem = Menu.Item;

const Sider = Layout.Sider;

function PageLayout(props) {
  const locale = useLocale();
  return (
    <Layout className={styles.layout}>
      <div className={cs(styles['layout-navbar'])}>
        <Navbar show />
      </div>
      <Layout>
        <Sider
          className={styles['layout-sider']}
          // width={menuWidth}
          // collapsed={collapsed}
          // onCollapse={setCollapsed}
          style={{ width: '220px', paddingTop: '60px' }}
          trigger={null}
          collapsible
          breakpoint="xl"
          // style={paddingTop}
        >
          <div className={styles['menu-wrapper']}>
            <Menu
              // collapse={collapsed}
              // onClickMenuItem={onClickMenuItem}
              // selectedKeys={selectedKeys}
              // openKeys={openKeys}
              onClickSubMenu={(_, openKeys) => {
                console.log(112333, _, openKeys);
                // setOpenKeys(openKeys);
              }}
            >
              {routes.map((route, index) => {
                return (
                  <MenuItem key={index + ''}>
                    <IconBug /> {locale[route.name]}
                  </MenuItem>
                );
              })}
            </Menu>
          </div>
        </Sider>
        <Layout
          className={styles['layout-content']}
          style={{ paddingLeft: '220px', paddingTop: '60px' }}
        >
          <div className={styles['layout-content-wrapper']}>
            {props.children}
          </div>
        </Layout>
      </Layout>
    </Layout>
  );
}

export default PageLayout;
