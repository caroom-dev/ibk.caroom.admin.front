// tslint:disable:interface-name
import { createBrowserHistory } from 'history';

declare global {
    // eslint-disable-next-line no-unused-vars
    interface Window {
        dataLayer: any;
    }
}

const History = createBrowserHistory();

export default History;
