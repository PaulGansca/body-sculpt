import { shallow } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import LeaderboardPage from './leaderboard-page';
import LeaderboardPageContainer from './leaderboard-page-container';

let wrapper;

beforeEach(() => {
    const mockProps = {
        users: []
    }
    wrapper = shallow(<LeaderboardPage {...mockProps} />);
})

describe('<LeaderboardPage />', () => {
    it("expect to render leaderboard page with props", () => {
        expect(wrapper).toMatchSnapshot();
    })

    it("expect to render container with no props", () => {
        const mockProps = {
            getState: jest.fn(),
            subscribe: jest.fn(),
            dispatch: jest.fn(),
        }
        wrapper = shallow(
                    <Provider store={mockProps}>
                        <LeaderboardPageContainer {...mockProps} />
                    </Provider>)
        expect(wrapper).toMatchSnapshot();
    })
});