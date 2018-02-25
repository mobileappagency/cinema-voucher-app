import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

class XMLHttpRequest {
  open () {}
  send () {}
}

// AJAX
global.XMLHttpRequest = XMLHttpRequest
