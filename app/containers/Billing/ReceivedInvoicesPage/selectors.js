import { createSelector } from 'reselect';

const selectReceivedInvoicesPage = () => (state) => state.get('receivedInvoicesPage');

const selectInvoices = () => createSelector(
  selectReceivedInvoicesPage(),
  (state) => state.get('invoices').toJS(),
);

const selectLoading = () => createSelector(
  selectReceivedInvoicesPage(),
  (state) => state.get('loading'),
);

export {
  selectInvoices,
  selectLoading,
};
