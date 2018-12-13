//@flow
import React from 'react'
import {Text} from 'grommet'

type Props = {
	msg:string
};

const ErrorMsg = ({msg}:Props) => <Text color="status-error">{msg}</Text>

export default ErrorMsg;