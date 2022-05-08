// This Source Code Form is subject to the terms of the Mozilla Public
// License, v2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

import { PanelsState } from "@foxglove/studio-base/context/CurrentLayoutContext/actions";
// import { defaultPlaybackConfig } from "@foxglove/studio-base/providers/CurrentLayoutProvider/reducers";

/**
 * This is loaded when the user has no layout selected on application launch
 * to avoid presenting the user with a blank layout.
 */
export const defaultLayout: PanelsState =
{
  "configById": {
    "3D Panel!3p86wvb": {
      "autoSyncCameraState": false,
      "autoTextBackgroundColor": true,
      "cameraState": {
        "distance": 8.118757409619885,
        "perspective": true,
        "phi": 0,
        "targetOffset": [
          -2.2978896795965755,
          3.9909282233871197,
          0
        ],
        "thetaOffset": -1.5612511283791264e-17,
        "fovy": 0.7853981633974483,
        "near": 0.01,
        "far": 5000
      },
      "checkedKeys": [
        "name:Topics",
        "t:/lc_ve/dynmap"
      ],
      "clickToPublishPoseTopic": "/move_base_simple/goal",
      "clickToPublishPointTopic": "/clicked_point",
      "clickToPublishPoseEstimateTopic": "/initialpose",
      "clickToPublishPoseEstimateXDeviation": 0.5,
      "clickToPublishPoseEstimateYDeviation": 0.5,
      "clickToPublishPoseEstimateThetaDeviation": 0.2617993877991494,
      "customBackgroundColor": "#808080",
      "diffModeEnabled": true,
      "expandedKeys": [
        "name:Topics"
      ],
      "followMode": "follow",
      "modifiedNamespaceTopics": [],
      "pinTopics": false,
      "settingsByKey": {},
      "useThemeBackgroundColor": false
    },
    "3D Panel!7njw9h": {
      "autoSyncCameraState": false,
      "autoTextBackgroundColor": true,
      "cameraState": {
        "distance": 8.664446607105395,
        "perspective": true,
        "phi": 0,
        "targetOffset": [
          -2.330334924479402,
          4.0585511571781705,
          0
        ],
        "thetaOffset": -1.734723475976807e-18,
        "fovy": 0.7853981633974483,
        "near": 0.01,
        "far": 5000
      },
      "checkedKeys": [
        "name:Topics",
        "t:/lc_ve/vismap"
      ],
      "clickToPublishPoseTopic": "/move_base_simple/goal",
      "clickToPublishPointTopic": "/clicked_point",
      "clickToPublishPoseEstimateTopic": "/initialpose",
      "clickToPublishPoseEstimateXDeviation": 0.5,
      "clickToPublishPoseEstimateYDeviation": 0.5,
      "clickToPublishPoseEstimateThetaDeviation": 0.2617993877991494,
      "customBackgroundColor": "#000000",
      "diffModeEnabled": true,
      "expandedKeys": [
        "name:Topics"
      ],
      "followMode": "follow",
      "modifiedNamespaceTopics": [],
      "pinTopics": false,
      "settingsByKey": {},
      "useThemeBackgroundColor": true
    },
    "ImageViewPanel!9fxu36": {
      "cameraTopic": "/lc_image",
      "customMarkerTopicOptions": [],
      "enabledMarkerTopics": [],
      "mode": "fit",
      "pan": {
        "x": 0,
        "y": 0
      },
      "rotation": 0,
      "synchronize": false,
      "transformMarkers": true,
      "zoom": 1
    },
    "3D Panel!4820al6": {
      "autoSyncCameraState": false,
      "autoTextBackgroundColor": true,
      "cameraState": {
        "distance": 23.19650664585766,
        "perspective": true,
        "phi": 0.8146753528049449,
        "targetOffset": [
          -2.540010984185039,
          3.7684042429831304,
          0
        ],
        "thetaOffset": 0.03785502174799692,
        "fovy": 0.7853981633974483,
        "near": 0.01,
        "far": 5000
      },
      "checkedKeys": [
        "name:Topics",
        "t:/registered_scan",
        "t:/lc_mesh",
        "t:/lc_dets",
        "t:/dyn_map/gt_dynmap"
      ],
      "clickToPublishPoseTopic": "",
      "clickToPublishPointTopic": "/way_point",
      "clickToPublishPoseEstimateTopic": "",
      "clickToPublishPoseEstimateXDeviation": 0.5,
      "clickToPublishPoseEstimateYDeviation": 0.5,
      "clickToPublishPoseEstimateThetaDeviation": 0.2617993877991494,
      "customBackgroundColor": "#000000",
      "diffModeEnabled": true,
      "expandedKeys": [
        "name:Topics"
      ],
      "followMode": "follow",
      "modifiedNamespaceTopics": [],
      "pinTopics": false,
      "settingsByKey": {
        "t:/registered_scan": {
          "colorMode": {
            "mode": "flat",
            "flatColor": {
              "r": 1,
              "g": 1,
              "b": 1,
              "a": 1
            }
          },
          "pointSize": 2
        },
        "t:/lc_cloud": {
          "colorMode": {
            "rgbByteOrder": "bgra",
            "mode": "rgb"
          },
          "pointSize": 1,
          "pointShape": "square"
        },
        "t:/lc_dets": {
          "colorMode": {
            "mode": "gradient",
            "colorField": "intensity",
            "minValue": 0,
            "maxValue": 255,
            "minColor": {
              "r": 0,
              "g": 0,
              "b": 1,
              "a": 1
            },
            "maxColor": {
              "r": 0,
              "g": 1,
              "b": 1,
              "a": 1
            }
          }
        }
      },
      "useThemeBackgroundColor": true
    },
    "3D Panel!4ay60cj": {
      "autoSyncCameraState": false,
      "autoTextBackgroundColor": true,
      "cameraState": {
        "distance": 8.664446607105395,
        "perspective": true,
        "phi": 0,
        "targetOffset": [
          -2.3089016164435066,
          3.9089304524524806,
          0
        ],
        "thetaOffset": -0.000344448310963261,
        "fovy": 0.7853981633974483,
        "near": 0.01,
        "far": 5000
      },
      "checkedKeys": [
        "name:Topics",
        "t:/dyn_map/gt_dynmap"
      ],
      "clickToPublishPoseTopic": "/move_base_simple/goal",
      "clickToPublishPointTopic": "/clicked_point",
      "clickToPublishPoseEstimateTopic": "/initialpose",
      "clickToPublishPoseEstimateXDeviation": 0.5,
      "clickToPublishPoseEstimateYDeviation": 0.5,
      "clickToPublishPoseEstimateThetaDeviation": 0.2617993877991494,
      "customBackgroundColor": "#808080",
      "diffModeEnabled": true,
      "expandedKeys": [
        "name:Topics"
      ],
      "followMode": "follow",
      "modifiedNamespaceTopics": [],
      "pinTopics": false,
      "settingsByKey": {},
      "useThemeBackgroundColor": false
    },
    "3D Panel!w21xy4": {
      "autoSyncCameraState": false,
      "autoTextBackgroundColor": true,
      "cameraState": {
        "targetOffset": [
          -2.2954489975625023,
          4.0412383897633894,
          0
        ],
        "distance": 9.097157933157753,
        "perspective": true,
        "phi": 0,
        "thetaOffset": -6.282828839351634,
        "fovy": 0.7853981633974483,
        "near": 0.01,
        "far": 5000
      },
      "checkedKeys": [
        "name:Topics",
        "t:/dyn_map/gt_vismap"
      ],
      "clickToPublishPoseTopic": "/move_base_simple/goal",
      "clickToPublishPointTopic": "/clicked_point",
      "clickToPublishPoseEstimateTopic": "/initialpose",
      "clickToPublishPoseEstimateXDeviation": 0.5,
      "clickToPublishPoseEstimateYDeviation": 0.5,
      "clickToPublishPoseEstimateThetaDeviation": 0.2617993877991494,
      "customBackgroundColor": "#808080",
      "diffModeEnabled": true,
      "expandedKeys": [
        "name:Topics"
      ],
      "followMode": "follow",
      "modifiedNamespaceTopics": [],
      "pinTopics": false,
      "settingsByKey": {},
      "useThemeBackgroundColor": false,
      "followTf": "map"
    },
    "3D Panel!3m32xd7": {
      "autoSyncCameraState": false,
      "autoTextBackgroundColor": true,
      "cameraState": {
        "distance": 8.469496558445524,
        "perspective": true,
        "phi": 0,
        "targetOffset": [
          -2.116490906889414,
          4.115808780791842,
          0
        ],
        "thetaOffset": 0.003614918706967416,
        "fovy": 0.7853981633974483,
        "near": 0.01,
        "far": 5000
      },
      "checkedKeys": [
        "name:Topics",
        "t:/lc_ve/dynmap"
      ],
      "clickToPublishPoseTopic": "/move_base_simple/goal",
      "clickToPublishPointTopic": "/clicked_point",
      "clickToPublishPoseEstimateTopic": "/initialpose",
      "clickToPublishPoseEstimateXDeviation": 0.5,
      "clickToPublishPoseEstimateYDeviation": 0.5,
      "clickToPublishPoseEstimateThetaDeviation": 0.2617993877991494,
      "customBackgroundColor": "#808080",
      "diffModeEnabled": true,
      "expandedKeys": [
        "name:Topics"
      ],
      "followMode": "follow",
      "modifiedNamespaceTopics": [],
      "pinTopics": false,
      "settingsByKey": {},
      "useThemeBackgroundColor": false
    },
    "ImageViewPanel!bxt24w": {
      "cameraTopic": "/lc_image",
      "customMarkerTopicOptions": [],
      "enabledMarkerTopics": [],
      "mode": "fit",
      "pan": {
        "x": 0,
        "y": 0
      },
      "rotation": 0,
      "synchronize": false,
      "transformMarkers": false,
      "zoom": 1
    },
    "3D Panel!39brp4i": {
      "autoSyncCameraState": false,
      "autoTextBackgroundColor": true,
      "cameraState": {
        "distance": 31.383508991454484,
        "perspective": true,
        "phi": 0.973208377945937,
        "targetOffset": [
          -2.4347842940691953,
          6.16575366527566,
          0
        ],
        "thetaOffset": -6.258349787566802,
        "fovy": 0.7853981633974483,
        "near": 0.01,
        "far": 5000
      },
      "checkedKeys": [
        "name:Topics",
        "t:/registered_scan",
        "t:/lc_mesh",
        "t:/lc_dets",
        "t:/dyn_map/gt_dynmap"
      ],
      "clickToPublishPoseTopic": "/move_base_simple/goal",
      "clickToPublishPointTopic": "/clicked_point",
      "clickToPublishPoseEstimateTopic": "/initialpose",
      "clickToPublishPoseEstimateXDeviation": 0.5,
      "clickToPublishPoseEstimateYDeviation": 0.5,
      "clickToPublishPoseEstimateThetaDeviation": 0.2617993877991494,
      "customBackgroundColor": "#000000",
      "diffModeEnabled": true,
      "expandedKeys": [
        "name:Topics"
      ],
      "followMode": "follow",
      "modifiedNamespaceTopics": [],
      "pinTopics": false,
      "settingsByKey": {
        "t:/lc_cloud": {
          "colorMode": {
            "rgbByteOrder": "bgra",
            "mode": "rgb"
          },
          "pointSize": 1,
          "pointShape": "square"
        },
        "t:/registered_scan": {
          "pointSize": 2,
          "colorMode": {
            "mode": "flat",
            "flatColor": {
              "r": 1,
              "g": 1,
              "b": 1,
              "a": 1
            }
          }
        },
        "t:/lc_dets": {
          "colorMode": {
            "mode": "gradient",
            "colorField": "intensity",
            "minValue": 0,
            "maxValue": 255,
            "minColor": {
              "r": 0,
              "g": 0,
              "b": 1,
              "a": 1
            },
            "maxColor": {
              "r": 0,
              "g": 1,
              "b": 1,
              "a": 1
            }
          }
        }
      },
      "useThemeBackgroundColor": true
    },
    "Plot!2wjoy1g": {
      "paths": [
        {
          "value": "/lc_ve/tsflog.error_absolute",
          "enabled": true,
          "timestampMethod": "receiveTime"
        },
        {
          "value": "/lc_ve/tsflog.true_interval",
          "enabled": true,
          "timestampMethod": "receiveTime"
        }
      ],
      "minYValue": "",
      "maxYValue": "",
      "showXAxisLabels": true,
      "showYAxisLabels": true,
      "showLegend": false,
      "legendDisplay": "floating",
      "showPlotValuesInLegend": false,
      "isSynced": true,
      "xAxisVal": "timestamp",
      "sidebarDimension": 240,
      "title": "RED: Observed intervals. BLUE: Error in forecasting intervals (ms)",
      "followingViewWidth": 0
    },
    "Plot!1vmemdl": {
      "paths": [
        {
          "value": "/lc_ve/tsflog.error_relative",
          "enabled": true,
          "timestampMethod": "receiveTime"
        }
      ],
      "minYValue": 1,
      "maxYValue": 0,
      "showXAxisLabels": true,
      "showYAxisLabels": true,
      "showLegend": false,
      "legendDisplay": "floating",
      "showPlotValuesInLegend": false,
      "isSynced": true,
      "xAxisVal": "timestamp",
      "sidebarDimension": 240,
      "title": "Relative error in forecasting intervals"
    },
    "Tab!lb68hr": {
      "activeTabIdx": 0,
      "tabs": [
        {
          "title": "With GT",
          "layout": {
            "direction": "row",
            "first": {
              "first": "3D Panel!3p86wvb",
              "second": "3D Panel!7njw9h",
              "direction": "column",
              "splitPercentage": 47.681400564276935
            },
            "second": {
              "first": {
                "first": "ImageViewPanel!9fxu36",
                "second": "3D Panel!4820al6",
                "direction": "column",
                "splitPercentage": 27.77255299139116
              },
              "second": {
                "first": "3D Panel!4ay60cj",
                "second": "3D Panel!w21xy4",
                "direction": "column",
                "splitPercentage": 49.41860465116279
              },
              "direction": "row",
              "splitPercentage": 56.95364238410596
            },
            "splitPercentage": 31.842429216249485
          }
        },
        {
          "title": "Hugging",
          "layout": {
            "first": {
              "first": "3D Panel!3m32xd7",
              "second": "ImageViewPanel!bxt24w",
              "direction": "column",
              "splitPercentage": 45.24422320898267
            },
            "second": {
              "first": "3D Panel!39brp4i",
              "second": {
                "first": "Plot!2wjoy1g",
                "second": "Plot!1vmemdl",
                "direction": "column"
              },
              "direction": "row",
              "splitPercentage": 54.79396715600478
            },
            "direction": "row",
            "splitPercentage": 31.83082915971063
          }
        }
      ]
    }
  },
  "globalVariables": {},
  "userNodes": {},
  "linkedGlobalVariables": [],
  "playbackConfig": {
    "speed": 1,
    "messageOrder": "receiveTime"
  },
  "layout": "Tab!lb68hr"
} as const;
