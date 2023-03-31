import images from "./images"

const services = {
    options: [
        {
            value: 0,
            name: 'finance',
            label: 'Finance',
            templates: {
                first: {
                    img: images.fintemplate1,
                    data: [
                        {
                            root: 'P12',
                            name: 'P12',
                            dataGrid: {
                                x: 0, y: 0, w: 1, h: 2,
                            },
                            color: 'earth'
                        },
                        {
                            root: 'SS22',
                            name: 'SS22',
                            dataGrid: {
                                x: 1, y: 0, w: 2, h: 2,
                            },
                            color: 'earth'
                        },
                        {
                            root: 'B34',
                            name: 'B34',
                            dataGrid: {
                                x: 0, y: 2, w: 3, h: 4,
                            },
                            color: 'earth'
                        },
                        {
                            root: 'BS16',
                            name: 'BS16',
                            dataGrid: {
                                x: 3, y: 0, w: 1, h: 6,
                            },
                            color: 'earth'
                        },
                    ]
                },
                second: {
                    img: images.fintemplate2,
                    data: [
                        {
                            root: 'P12',
                            name: 'P12',
                            dataGrid: {
                                x: 0, y: 0, w: 1, h: 2,
                            },
                            color: 'water'
                        },
                        {
                            root: 'SS22',
                            name: 'SS22',
                            dataGrid: {
                                x: 1, y: 0, w: 2, h: 2,
                            },
                            color: 'water'
                        },
                        {
                            root: 'A34',
                            name: 'A34',
                            dataGrid: {
                                x: 0, y: 2, w: 3, h: 4,
                            },
                            color: 'water'
                        },
                        {
                            root: 'BS16',
                            name: 'BS16',
                            dataGrid: {
                                x: 3, y: 0, w: 1, h: 6,
                            },
                            color: 'water'
                        },
                    ]
                },
            }
        },
        {
            value: 1,
            name: 'fitness',
            label: 'Fitness',
            templates: {
                first: {
                    img: images.fittemplate1,
                    data: [
                        {
                            root: 'P12',
                            name: 'P12',
                            dataGrid: {
                                x: 0, y: 0, w: 1, h: 2,
                            },
                            color: 'earth'
                        },
                    ]
                },
                second: {
                    img: images.fittemplate2,
                    data: [
                        {
                            root: 'A34',
                            name: 'A34',
                            dataGrid: {
                                x: 0, y: 0, w: 3, h: 4,
                            },
                            color: 'water'
                        },
                        {
                            root: 'P12',
                            name: 'P12',
                            dataGrid: {
                                x: 3, y: 0, w: 1, h: 2,
                            },
                            color: 'water'
                        },
                    ]
                },
            }
        },
    ]
}

export default services