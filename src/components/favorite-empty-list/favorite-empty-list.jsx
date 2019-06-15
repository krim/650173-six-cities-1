import React from 'react';

import Footer from '../footer/footer.jsx';
import Header from '../header/header.jsx';
import {userProps} from '../../props';

const FavoriteEmptyList = (props) => {
  const {user} = props;

  return (
    <div className="page">
      <Header user={user} />
      <main className="page__main page__main--favorites page__main--favorites-empty">
        <div className="page__favorites-container container">
          <section className="favorites favorites--empty">
            <h1 className="visually-hidden">Favorites (empty)</h1>
            <div className="favorites__status-wrapper">
              <b className="favorites__status">Nothing yet saved.</b>
              <p className="favorites__status-description">Save properties to narrow down search or plan yor future
                trips.</p>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

FavoriteEmptyList.propTypes = {
  user: userProps
};

export default FavoriteEmptyList;
