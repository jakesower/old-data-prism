const MainAction = require('../components/main/types').Action;
const {catalog} = require('../samples/index');

module.exports = {
  title: "North Pole Warming",
  description: "Examine raw temperature data to see a pattern of warming over the north pole.",
  steps: [
    { text: 'First, load the test dataset by clicking "Load Sample" and selecting "Monthly North Pole Temperature Deviations"',
      action: MainAction.LoadURI("")
    },
    { text: 'Wait for the data to load.',
      action:
    }
    { text: 'Click the "Remix" tab at the top.',
      action: MainAction.SetPage('PrepareData')
    }
  ]
}
