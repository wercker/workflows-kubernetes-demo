import React from 'react';
import { Link } from 'react-router';

import './_AppLayout.scss';

class AppLayout extends React.Component {
  render() {
    return (
      <div className='page-container'>
        <nav>
          <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/about'>About</Link></li>
          </ul>
        </nav>
        <div className='page-content'>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default AppLayout;
