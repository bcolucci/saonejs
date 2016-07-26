
# Filters

```
import river from 'river';
import riverElasticsearch from 'river-elasticsearch';

import GenderFilter from './GenderFilter';
import MaleProcessor from './MaleProcessor';
import FemaleProcessor from './FemaleProcessor';
import AnotherMalesWorkflow from './AnotherMalesWorkflow';

var c = river.config();
const lastWeekEvents = ElasticSearch({
  "index": "myApp",
  "type": "events",
  "query": {
    "constant_score": {
      "query": {
        "range": {
          "createdAt": {
            "from":"now-7d"
          }
        }
      }
    }
  }
});


const AgeMap = River.Map({ field: 'age' });
const combine = River.Combine();
const prettyConsole = River.PrettyConsole({ indent: 2 });


// c.flow(input, processor, output);

// const { males, females, none } = c.flow(lastWeekEvents, myGenderFilter);
// const processedMales = c.flow(myMaleProcessor, males);
// const processedFemales = c.flow(myFemaleProcessor, females);
// const maleAges = c.flow(myAgeMap, processedMales);
// const femaleAges = c.flow(myAgeMap, processedFemales);
// c.flow(prettyConsole, maleAges);
// c.flow(mongoSave, femalesAges);


// const { males, females, none } = myGenderFilter(lastWeekEvents);

const malesFlow = MaleProcessor
  .into(AgeMap)
  .into(Above60YearsOldFilter)
  .into(prettyConsole, Stop)
  .combine();

const femalesFlow = FemaleProcessor
  .into(AgeMap)
  .into(mongoSave);

const flow = GenderFilter
  .into(malesFlow, femalesFlow, Stop)
  .into(_, prettyConsole);

const start = flow(lastWeekEvents);

const [ streamOfMalesOver60, streamOfFemaleAges ] = start();







// const malesWorkflow = c.workflow([
//   c.flow({}, myMaleProcessor, 'processedMales'),
//   c.flow('processedMales', myAgeMap(), 'maleAges'),
//   c.flow('maleAges', prettyConsole, null)
// ]);

// c.workflow('femalesWorkflow', [
//   c.flow({}, 'myFemaleProcessor', 'processedFemales'),
//   c.flow('processedFemales', 'myAgeMap', 'femaleAges'),
//   c.flow('femaleAges', 'mongoSave', null)
// ]);

// c.workflow('default', [
//   c.flow({}, 'lastWeekEvents', 'lastWeekEvents'),
//   c.flow('lastWeekEvents', 'myGenderFilter', { 'males', 'females', 'none' }),
//   c.flow('males', 'anotherMalesWorkflow', null),
//   c.flow('males', 'malesWorkflow', null),
//   c.flow('females', 'femalesWorkflow', null)
// ]);



// workflows: {
//     "malesWorkflow": [
//       "{} => myMaleProcessor as processedMales",
//       "processedMales => ageMap as maleAges",
//       "maleAges => prettyConsole",
//     ],

//     "femalesWorkflow": [
//       "{} => myFemaleProcessor as processedFemales",   
//       "processedFemales => ageMap as femaleAges",
//       "femaleAges => mongoSave"
//     ],

//     "default": [
//       "{} => lastWeekEvents as lastWeekEvents",
//       "lastWeekEvents => myGenderFilter as { males, females, none }",
//       "males => anotherMalesWorkflow"
//       "males => malesWorkflow",
//       "females => femalesWorkflow"
//     ]
//   },


```

```
import anotherMalesWorkflow from '../workflows/male';

// whatever i want

export default const config = {
  

  "sources": {
    "lastWeekEvents": {
      "type": "elasticsearch",
      "index": "myApp",
      "type": "events",
      "query": {
        "constant_score": {
          "query": {
            "range": {
              "createdAt": {
                "from":"now-7d"
              }
            }
          }
        }
      }
    }
  },

  "processes": {
    "myGenderFilter": {
      "type": "Mx",
      "type": "strict",
      "params": {}
    },

    "myMaleProcessor": {},
    "myFemaleProcessor": {},

    "ageMap": {},

    "combine": {},

    "prettyConsole": {
      "type": "console",
      "pretty": true,
      "indent": 2
    }
  },

  "workflows": [
    "{} => lastWeekEvents as lastWeekEvents",
    "lastWeekEvents => myGenderFilter as { males, females, none }",

    "males => myMaleProcessor as processedMales",
    "processedMales => ageMap as maleAges",
    "maleAges => prettyConsole",

    "females => myFemaleProcessor as processedFemales",
    "processedFemales => ageMap as femaleAges",
    "femaleAges => mongoSave"
  ],

  workflows: {
    "malesWorkflow": [
      "{} => myMaleProcessor as processedMales",
      "processedMales => ageMap as maleAges",
      "maleAges => prettyConsole",
    ],

    "femalesWorkflow": [
      "{} => myFemaleProcessor as processedFemales",   
      "processedFemales => ageMap as femaleAges",
      "femaleAges => mongoSave"
    ],

    "default": [
      "{} => lastWeekEvents as lastWeekEvents",
      "lastWeekEvents => myGenderFilter as { males, females, none }",
      "males => anotherMalesWorkflow"
      "males => malesWorkflow",
      "females => femalesWorkflow"
    ]
  },
}
```