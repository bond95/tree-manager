import { connect } from 'react-redux';
import { updateNodes } from '../../actions';
import App from './App';

export default connect(
  state => ({
    tree: state.tree
  }),
  {
    onAddNode: updateNodes
  }
)(App);
