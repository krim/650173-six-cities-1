import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import {SORT_VARIANTS} from '../../constants';
import withSort from '../../hocs/with-sort/with-sort';

class SortVariants extends PureComponent {
  render() {
    const {onOptionClick, onOptionsClick, opened, activeSort} = this.props;

    return (
      <form className="places__sorting" action="#" method="get">
        <span className="places__sorting-caption">Sort by </span>
        <span className="places__sorting-type" tabIndex="0" onClick={onOptionsClick}>
          {activeSort}
          <svg className="places__sorting-arrow" width="7" height="4">
            <use xlinkHref="#icon-arrow-select"></use>
          </svg>
        </span>
        <ul className={`places__options places__options--custom${this._getOptionsClass(opened)}`}>
          {
            SORT_VARIANTS.map((sort, index) => {
              return <li
                key={`option-${index}`}
                className={`places__option ${this._getOptionClass(sort)}`}
                tabIndex={`${index}`}
                onClick={() => onOptionClick(sort)}
              >
                {sort}
              </li>;
            })
          }
        </ul>
      </form>
    );
  }

  _getOptionsClass(opened) {
    return opened ? ` places__options--opened` : ``;
  }

  _getOptionClass(name) {
    return this.props.activeSort === name ? `places__option--active` : ``;
  }
}

SortVariants.propTypes = {
  activeSort: PropTypes.string.isRequired,
  onOptionsClick: PropTypes.func.isRequired,
  onOptionClick: PropTypes.func.isRequired,
  opened: PropTypes.bool.isRequired
};

export {SortVariants};
export default withSort(SortVariants);
