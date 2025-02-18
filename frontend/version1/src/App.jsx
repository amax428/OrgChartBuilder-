import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import OrgChart from './components/OrgChart';

const App = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <OrgChart />
    </DndProvider>
  );
};

export default App;
