import moment from 'moment'

const checkIfVideoDurationIsOk = (duration: string) => {
    return moment.duration(duration).asSeconds() < 600
}

export default checkIfVideoDurationIsOk