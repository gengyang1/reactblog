

module.exports = 
{
    "presets": ["next/babel","@babel/preset-env"],

    "plugins": [
        "@babel/plugin-transform-runtime",
        "transform-class-properties",
        [
            "import",{
                "libraryName": "antd",
                "style": "css"
            }
        ]
    ]
}

