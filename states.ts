import { createMachine, interpret } from "xstate";
// import { assign } from "./____node_modules/xstate/lib";

interface Context {
  retries: number;
  MERGED: boolean;
  COMPLETE: boolean;
  NEXT: boolean;
  // UPDATED: boolean;
  APPENDED: boolean;
}

const CacheMachineState = 
/** @xstate-layout N4IgpgJg5mDOIC5QFkCGBjAFgSwHZgAVUAnVAWzABcxiA6ASQgBswBiAYQHkA5AFQFE+iUAAcA9rGyVsY3MJAAPRAFoAzAAYAjLQBsqzQFYALEYAcB9QCYAnKssB2ADQgAnipunaRg9YOqTBjo+RqoAvqHOaFh4hCTkVDS0AGJ4EOwYmGApLKwASvwAggAi8uKS0rLySgiaJrSqQaY6RpZGmkGaVs5uCMo29rS+vnrmOurW9pphESBROPhEpBTUdCm4aRlZ2Dns+QUCpRJSMnJIiu51qqa+9jqWY0GqBk6u7uo6tJPe6up29qpPaaRDIxRbxFa0XJgVAQPBQdJYNgAVQIRX2-EO5ROVUQDgGBksqnsJk0U1MnQMBm6Kgmuk0lisplU1nJmns1nCwOiCziy0SAHViMdcPDNrR2GIyCISHCiqhKKhWMh+LkAOIYs5lY6VM7VZRTAy0CxGIIGJrkyzPKmvBAhdSfDz2d4hfSWByc2YgnlLBJ0QXC0WI8WS6VCkVyhWsAoEAiCEqao4VU6gPWtSy6Z7qJoOaxZoz2UzUmpEo0Fp2WdrmBnumZzUG8320f3SEUIzLBqUy8PyxVcZAEAAy-AOCaxOpTKn8AyeTNMZja1h0Ok0RadngcPyu+Z0pksHrr3vBAqFLcD7YlnbDUAjiu4-AAGrxMdrk+deu0jLRWkTTOpiRYKVUItl3TUwwMCStCVJIFPW5WIfQhZs4TbMBaGQGgoDhTgmAgG9+SkTAJVwahiJvJUVXVeNRETbFdVxSlBizQJLF3IIjGsawjCLPxP38PxTALKZvAafcvXgo8-RPZCxQKEQRDAdYiJIygyL7Qdhw1aix1faoWnTVodH+axCUJBpDKLTRriNAF7AZNpbJCPxRLgsE+UkgMUNoWT5MU2RlLI6NY24Ip+CokAtSTHEEDuXR-idCwCRY-QVxtPF6h0Ti7muGxONuZz5nEtymyk1tNlYABlAoADVQufSK6Oi7xaD-TiGhMMYnmtHoDHpep-FsXKwOZGCD0Kxt2GIaFTxQ1h+VyegRy0l8ouUex8VJSthP0X4upUX8jSMP8-zZUl2O8cIZlwMQIDgeRRtcxtGBYOraInXoQk-f5DDNN1CUOokizUdRP3zeL7jW6x2nsfL6wQxI1g2RFsjAF7xzffV7ENE6eoEji3R6l4eiBkG1vUAlDPZKGYcPIqoRhaTEVRnTEGZbQ1paDQiSE9rActdNEveZdfBMzHqbGxCSrPVCL1DWUeyZlarntPQzVZdkyZsLibQJAZdwLbxAgy-QDDFh6JY8sV0OITCRWw3Ce3wyhCL8hSVJ7WgCAAV1PG8FYatkPn0cwddsjRFx0IsQm0cl3i0JliXikaxLN48LaDK2bagO28IIpTXd90dlv9gl6ksyk8UJcYlyLGdaF3d42XYvRhdNhtzemmS5IUtIXdI+XC-qt6Qi8dnMeXLRiRNCObUs1RmvaP6zDsbxodrZO29Tjug3K1AADcGcyP23uZAYHBOsDcwJLobSdNmCWMcZIb8AlW7h9yt8PgfXvRw7PxVsDSTqwJJxYCn5VZOjJj8HqJg9xrxchvOg-B1hHzfHcD4K9BIsXJDuSwq5niDAAT1RcEx6SvwkuKSa8oD4oy-mjPUP5S7q0MloP4JhAZmHSlMFixJIYNxEnAgqKdiAoL1N4TwX1KS7jdP4X4hNJxrS8Mw9m85w4XVCEAA */
createMachine<Context>(
  {
  context: {
    retries: 2,
    MERGED: false,
    COMPLETE: false,
    NEXT: false,
    // UPDATED: false,
    APPENDED: false,
  },
  id: "MachineParameter",
  initial: "Idle",
  states: {
    Idle: {
      on: {
        CONTENT: {
          target: "FindCacheFile",
        },
      },
    },
    FindCacheFile: {
      on: {
        READ: {
          cond: "EXIST",
          target: "ReadingCache",
        },
        CREATE: {
          cond: "NOTEXIST",
          target: "CreatingCache",
        },
      },
    },
    ReadingCache: {
      on: {
        UPDATE: {
          cond: "DATA",
          target: "WritingCache",
        },
      },
    },
    WritingCache: {
      initial: "ComparingData",
      states: {
        ComparingData: {
          on: {
            MERGE: {
              cond: "EQUALKEYS",
              target: "MergingOldDataWithContentData",
            },
            APPEND: [
              {
                cond: "DIFFKEYS",
                target: "AppendContentData",
              },
              {
                cond: "FILEDESC",
                target: "AppendContentData",
              },
            ],
            COMPLETE: {
              target: "SavingCache",
            },
            NEXT: {
              target: "ComparingData",
              internal: false,
            },
          },
        },
        MergingOldDataWithContentData: {
          initial: "PutingData",
          states: {
            PutingData: {
              type: "final",
            },
          },
          on: {
            MERGED: {
              target: "ComparingData",
            },
          },
        },
        AppendContentData: {
          on: {
            COMPLETE: {
              target: "SavingCache",
            },
            APPENDED: {
              target: "ComparingData",
            },
          },
        },
        SavingCache: {
          type: "final",
        },
      },
      on: {
        SAVED: {
          target: "End",
        },
      },
    },
    End: {
      type: "final",
    },
    CreatingCache: {
      on: {
        WRITE: {
          cond: "FILEDESC",
          target: "WritingCache",
        },
      },
    },
  },
},
  {
    guards: {
      EXIST: (context) => {
        return true;
      },
      // MERGED: (context) => {
      //   context.MERGED = true;
      //   return true;
      // },
    },
    services: {},
  }
);


// const runner = interpret(CacheMachineState)
// runner.start()

// runner.send("CONTENT")
// runner.send("READ")
// runner.send("WRITE")