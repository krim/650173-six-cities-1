import React from 'react';
import renderer from 'react-test-renderer';
import apartment from '../../__fixtures__/apartment';
import TownList from '../../components/town-list/town-list.jsx';
import withActiveItem from '../../hocs/with-active-item/with-active-item';

const towns = [apartment.town];

const TownListWrapped = withActiveItem(TownList);

describe(`withActiveItem`, () => {
  it(`renders component correctly`, () => {
    const tree = renderer.
    create(<TownListWrapped
      towns={towns}
      activeItem={apartment.town}
      switchTown={jest.fn()}
    />).
    toJSON();

    expect(tree).toMatchSnapshot();
  });
});
