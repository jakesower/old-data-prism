const R = require('ramda');
const MainAction = require('../components/main/action');
const {catalog} = require('../samples/index');

module.exports = () => {
  const cData = R.find(R.propEq("name", "Monthly North Pole Temperature Deviations"), catalog);


  return {
    title: "North Pole Warming",
    description: "Examine raw temperature data to see a pattern of warming over the north pole.",
    steps: [
      { text: 'First, load the test dataset by clicking "Load Sample" and selecting "Monthly North Pole Temperature Deviations"',
        action: MainAction.LoadURI(cData.uri),
      },
      { text: 'Wait for the data to load.',
        action: MainAction
      },
      { text: 'Click the "Remix" tab at the top.',
        action: MainAction.SetPage('Remix')
      }
    ]
  }
}
