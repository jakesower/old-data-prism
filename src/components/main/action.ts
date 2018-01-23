import { append, evolve, inc } from 'ramda';
import { toggle, assoc } from '../../lib/action-functions';
import { DataTable } from '../../types';

export const SetPage = assoc('page');
export const SetMainDimensions = assoc('mainDimensions');
export const ToggleHelp = toggle('help');
export const ToggleWalkthrough = toggle('walkthrough');

export const CreateSource = (name: string, dataTable: DataTable) =>
  (model: any) => evolve({
    dataLoading: () => false,
    activeSource: () => model.uid,
    uid: inc,
    sources: append({ name, dataTable, id: model.uid, schema: {} })
  }, model);

// // To be handled by parent
// export const LoadLocalFile;
// export const LoadURI;

// // Deferments to children
// export const SetActiveSource;
// export const SetCollectorList;
// export const SetGridState;
// export const SetChart;
