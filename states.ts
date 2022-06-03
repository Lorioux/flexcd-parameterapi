import createMachine from "xstate"


interface Context {
  retries: number;
}
// xstate-ignore-next-line
const CacheMachineState = createMachine<Context>({
    id: "MachineParameter",
    initial: "Idle",
    "states": {
      "Idle": {
        "on": {
          "CONTENT": {
            "target": "LookingUpCache"
          }
        }
      },
      "LookingUpCache": {
        "on": {
          "EXISTS": {
            "cond": "FILENAME",
            "target": "ReadingCache"
          },
          "NOTEXIST": {
            "cond": "CONTENT",
            "target": "CreatingCache"
          }
        }
      },
      "ReadingCache": {
        "on": {
          "DATA": {
            "cond": "CONTENT",
            "target": "WritingCache"
          }
        }
      },
      "WritingCache": {
        "initial": "ComparingData",
        "states": {
          "ComparingData": {
            "on": {
              "SIMILAR": {
                "cond": "CONTENT ITEM == DATA ITEM ",
                "target": "MergingOldDataItemWithContentData"
              },
              "DIFF": {
                "cond": "CONTENT ITEM !=  DATAITEMS",
                "target": "MergingOldDataWithContentData"
              },
              "COMPLETE": {
                "cond": "DESCRIPTOR",
                "target": "SavingCache"
              }
            }
          },
          "MergingOldDataItemWithContentData": {
            "initial": "GetItemKey",
            "states": {
              "GetItemKey": {
                "on": {
                  "KEY": {
                    "target": "PutData"
                  }
                }
              },
              "PutData": {
                "type": "final" 
              }
            },
            "on": {
              "MERGED": {
                "target": "ComparingData"
              }
            }
          },
          "MergingOldDataWithContentData": {
            "on": {
              "COMPLETE": {
                "cond": "DESCRIPTOR",
                "target": "#MachineParameter.WritingCache.SavingCache"
              }
            }
          },
          "SavingCache": {}
        },
        "on": {
          "SAVED": {
            "target": "End"
          }
        }
      },
      "End": {
          "type": "final"
      },
      "CreatingCache": {
        "on": {
          "FILE": {
            "cond": "CONTENT",
            "target": "WritingCache"
          }
        }
      }
    }
  });