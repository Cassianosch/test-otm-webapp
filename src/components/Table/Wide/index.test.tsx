import { WideTable } from './index';
import { screen, render, act } from '../../../tests';

type SimpleType = {
    id: number;
};
const getTable = () => screen.queryByTestId('table');

describe('<Table />', () => {
    it('if has no data table shouldnt appear', async () => {
        await act(async () => {
            render(
                <WideTable<SimpleType>
                    columns={[]}
                    data={[]}
                    customRenderers={{}}
                    selected={[]}
                    setSelected={null}
                    toggleSort={null}
                    sortKey={undefined}
                    sortOrd="desc"
                />,
            );
        });
        expect(getTable()).not.toBeInTheDocument();
    });
});
