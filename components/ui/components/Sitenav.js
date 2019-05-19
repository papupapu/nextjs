import React from 'react';

const categories = [
  {
    path: '/',
    title: 'Home',
    slug: 'home',
    description: '',
  },
  {
    path: '/surf',
    title: 'Surf',
    slug: 'surf',
    description: '',
  },
  {
    path: '/mountain',
    title: 'Mountain',
    slug: 'mountain',
    description: '',
  },
  {
    path: '/nba',
    title: 'NBA',
    slug: 'nba',
    description: '',
  },
  {
    path: '/comics',
    title: 'Comics',
    slug: 'comics',
    description: '',
  },
  {
    path: '/bike',
    title: 'Bike',
    slug: 'bike',
    description: '',
  },
];

const Sitenav = () => (
  <nav id="siteNav">
    <div className="sw">
      <ul>
        {
          categories.map(
            category => (
              <li key={`${Math.random()}_nav_link`}>
                {category.title}
              </li>
            ),
          )
        }
      </ul>
    </div>
  </nav>
);

export default Sitenav;
