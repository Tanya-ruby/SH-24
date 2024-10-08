// Code generated by mockery v2.43.2. DO NOT EDIT.

package mocks

import (
	context "context"
	big "math/big"

	ethereum "github.com/ethereum/go-ethereum"

	mock "github.com/stretchr/testify/mock"

	rpc "github.com/ethereum/go-ethereum/rpc"

	types "github.com/smartcontractkit/chainlink/v2/core/chains/evm/types"
)

// FeeEstimatorClient is an autogenerated mock type for the feeEstimatorClient type
type FeeEstimatorClient struct {
	mock.Mock
}

type FeeEstimatorClient_Expecter struct {
	mock *mock.Mock
}

func (_m *FeeEstimatorClient) EXPECT() *FeeEstimatorClient_Expecter {
	return &FeeEstimatorClient_Expecter{mock: &_m.Mock}
}

// BatchCallContext provides a mock function with given fields: ctx, b
func (_m *FeeEstimatorClient) BatchCallContext(ctx context.Context, b []rpc.BatchElem) error {
	ret := _m.Called(ctx, b)

	if len(ret) == 0 {
		panic("no return value specified for BatchCallContext")
	}

	var r0 error
	if rf, ok := ret.Get(0).(func(context.Context, []rpc.BatchElem) error); ok {
		r0 = rf(ctx, b)
	} else {
		r0 = ret.Error(0)
	}

	return r0
}

// FeeEstimatorClient_BatchCallContext_Call is a *mock.Call that shadows Run/Return methods with type explicit version for method 'BatchCallContext'
type FeeEstimatorClient_BatchCallContext_Call struct {
	*mock.Call
}

// BatchCallContext is a helper method to define mock.On call
//   - ctx context.Context
//   - b []rpc.BatchElem
func (_e *FeeEstimatorClient_Expecter) BatchCallContext(ctx interface{}, b interface{}) *FeeEstimatorClient_BatchCallContext_Call {
	return &FeeEstimatorClient_BatchCallContext_Call{Call: _e.mock.On("BatchCallContext", ctx, b)}
}

func (_c *FeeEstimatorClient_BatchCallContext_Call) Run(run func(ctx context.Context, b []rpc.BatchElem)) *FeeEstimatorClient_BatchCallContext_Call {
	_c.Call.Run(func(args mock.Arguments) {
		run(args[0].(context.Context), args[1].([]rpc.BatchElem))
	})
	return _c
}

func (_c *FeeEstimatorClient_BatchCallContext_Call) Return(_a0 error) *FeeEstimatorClient_BatchCallContext_Call {
	_c.Call.Return(_a0)
	return _c
}

func (_c *FeeEstimatorClient_BatchCallContext_Call) RunAndReturn(run func(context.Context, []rpc.BatchElem) error) *FeeEstimatorClient_BatchCallContext_Call {
	_c.Call.Return(run)
	return _c
}

// CallContext provides a mock function with given fields: ctx, result, method, args
func (_m *FeeEstimatorClient) CallContext(ctx context.Context, result interface{}, method string, args ...interface{}) error {
	var _ca []interface{}
	_ca = append(_ca, ctx, result, method)
	_ca = append(_ca, args...)
	ret := _m.Called(_ca...)

	if len(ret) == 0 {
		panic("no return value specified for CallContext")
	}

	var r0 error
	if rf, ok := ret.Get(0).(func(context.Context, interface{}, string, ...interface{}) error); ok {
		r0 = rf(ctx, result, method, args...)
	} else {
		r0 = ret.Error(0)
	}

	return r0
}

// FeeEstimatorClient_CallContext_Call is a *mock.Call that shadows Run/Return methods with type explicit version for method 'CallContext'
type FeeEstimatorClient_CallContext_Call struct {
	*mock.Call
}

// CallContext is a helper method to define mock.On call
//   - ctx context.Context
//   - result interface{}
//   - method string
//   - args ...interface{}
func (_e *FeeEstimatorClient_Expecter) CallContext(ctx interface{}, result interface{}, method interface{}, args ...interface{}) *FeeEstimatorClient_CallContext_Call {
	return &FeeEstimatorClient_CallContext_Call{Call: _e.mock.On("CallContext",
		append([]interface{}{ctx, result, method}, args...)...)}
}

func (_c *FeeEstimatorClient_CallContext_Call) Run(run func(ctx context.Context, result interface{}, method string, args ...interface{})) *FeeEstimatorClient_CallContext_Call {
	_c.Call.Run(func(args mock.Arguments) {
		variadicArgs := make([]interface{}, len(args)-3)
		for i, a := range args[3:] {
			if a != nil {
				variadicArgs[i] = a.(interface{})
			}
		}
		run(args[0].(context.Context), args[1].(interface{}), args[2].(string), variadicArgs...)
	})
	return _c
}

func (_c *FeeEstimatorClient_CallContext_Call) Return(_a0 error) *FeeEstimatorClient_CallContext_Call {
	_c.Call.Return(_a0)
	return _c
}

func (_c *FeeEstimatorClient_CallContext_Call) RunAndReturn(run func(context.Context, interface{}, string, ...interface{}) error) *FeeEstimatorClient_CallContext_Call {
	_c.Call.Return(run)
	return _c
}

// CallContract provides a mock function with given fields: ctx, msg, blockNumber
func (_m *FeeEstimatorClient) CallContract(ctx context.Context, msg ethereum.CallMsg, blockNumber *big.Int) ([]byte, error) {
	ret := _m.Called(ctx, msg, blockNumber)

	if len(ret) == 0 {
		panic("no return value specified for CallContract")
	}

	var r0 []byte
	var r1 error
	if rf, ok := ret.Get(0).(func(context.Context, ethereum.CallMsg, *big.Int) ([]byte, error)); ok {
		return rf(ctx, msg, blockNumber)
	}
	if rf, ok := ret.Get(0).(func(context.Context, ethereum.CallMsg, *big.Int) []byte); ok {
		r0 = rf(ctx, msg, blockNumber)
	} else {
		if ret.Get(0) != nil {
			r0 = ret.Get(0).([]byte)
		}
	}

	if rf, ok := ret.Get(1).(func(context.Context, ethereum.CallMsg, *big.Int) error); ok {
		r1 = rf(ctx, msg, blockNumber)
	} else {
		r1 = ret.Error(1)
	}

	return r0, r1
}

// FeeEstimatorClient_CallContract_Call is a *mock.Call that shadows Run/Return methods with type explicit version for method 'CallContract'
type FeeEstimatorClient_CallContract_Call struct {
	*mock.Call
}

// CallContract is a helper method to define mock.On call
//   - ctx context.Context
//   - msg ethereum.CallMsg
//   - blockNumber *big.Int
func (_e *FeeEstimatorClient_Expecter) CallContract(ctx interface{}, msg interface{}, blockNumber interface{}) *FeeEstimatorClient_CallContract_Call {
	return &FeeEstimatorClient_CallContract_Call{Call: _e.mock.On("CallContract", ctx, msg, blockNumber)}
}

func (_c *FeeEstimatorClient_CallContract_Call) Run(run func(ctx context.Context, msg ethereum.CallMsg, blockNumber *big.Int)) *FeeEstimatorClient_CallContract_Call {
	_c.Call.Run(func(args mock.Arguments) {
		run(args[0].(context.Context), args[1].(ethereum.CallMsg), args[2].(*big.Int))
	})
	return _c
}

func (_c *FeeEstimatorClient_CallContract_Call) Return(_a0 []byte, _a1 error) *FeeEstimatorClient_CallContract_Call {
	_c.Call.Return(_a0, _a1)
	return _c
}

func (_c *FeeEstimatorClient_CallContract_Call) RunAndReturn(run func(context.Context, ethereum.CallMsg, *big.Int) ([]byte, error)) *FeeEstimatorClient_CallContract_Call {
	_c.Call.Return(run)
	return _c
}

// ConfiguredChainID provides a mock function with given fields:
func (_m *FeeEstimatorClient) ConfiguredChainID() *big.Int {
	ret := _m.Called()

	if len(ret) == 0 {
		panic("no return value specified for ConfiguredChainID")
	}

	var r0 *big.Int
	if rf, ok := ret.Get(0).(func() *big.Int); ok {
		r0 = rf()
	} else {
		if ret.Get(0) != nil {
			r0 = ret.Get(0).(*big.Int)
		}
	}

	return r0
}

// FeeEstimatorClient_ConfiguredChainID_Call is a *mock.Call that shadows Run/Return methods with type explicit version for method 'ConfiguredChainID'
type FeeEstimatorClient_ConfiguredChainID_Call struct {
	*mock.Call
}

// ConfiguredChainID is a helper method to define mock.On call
func (_e *FeeEstimatorClient_Expecter) ConfiguredChainID() *FeeEstimatorClient_ConfiguredChainID_Call {
	return &FeeEstimatorClient_ConfiguredChainID_Call{Call: _e.mock.On("ConfiguredChainID")}
}

func (_c *FeeEstimatorClient_ConfiguredChainID_Call) Run(run func()) *FeeEstimatorClient_ConfiguredChainID_Call {
	_c.Call.Run(func(args mock.Arguments) {
		run()
	})
	return _c
}

func (_c *FeeEstimatorClient_ConfiguredChainID_Call) Return(_a0 *big.Int) *FeeEstimatorClient_ConfiguredChainID_Call {
	_c.Call.Return(_a0)
	return _c
}

func (_c *FeeEstimatorClient_ConfiguredChainID_Call) RunAndReturn(run func() *big.Int) *FeeEstimatorClient_ConfiguredChainID_Call {
	_c.Call.Return(run)
	return _c
}

// HeadByNumber provides a mock function with given fields: ctx, n
func (_m *FeeEstimatorClient) HeadByNumber(ctx context.Context, n *big.Int) (*types.Head, error) {
	ret := _m.Called(ctx, n)

	if len(ret) == 0 {
		panic("no return value specified for HeadByNumber")
	}

	var r0 *types.Head
	var r1 error
	if rf, ok := ret.Get(0).(func(context.Context, *big.Int) (*types.Head, error)); ok {
		return rf(ctx, n)
	}
	if rf, ok := ret.Get(0).(func(context.Context, *big.Int) *types.Head); ok {
		r0 = rf(ctx, n)
	} else {
		if ret.Get(0) != nil {
			r0 = ret.Get(0).(*types.Head)
		}
	}

	if rf, ok := ret.Get(1).(func(context.Context, *big.Int) error); ok {
		r1 = rf(ctx, n)
	} else {
		r1 = ret.Error(1)
	}

	return r0, r1
}

// FeeEstimatorClient_HeadByNumber_Call is a *mock.Call that shadows Run/Return methods with type explicit version for method 'HeadByNumber'
type FeeEstimatorClient_HeadByNumber_Call struct {
	*mock.Call
}

// HeadByNumber is a helper method to define mock.On call
//   - ctx context.Context
//   - n *big.Int
func (_e *FeeEstimatorClient_Expecter) HeadByNumber(ctx interface{}, n interface{}) *FeeEstimatorClient_HeadByNumber_Call {
	return &FeeEstimatorClient_HeadByNumber_Call{Call: _e.mock.On("HeadByNumber", ctx, n)}
}

func (_c *FeeEstimatorClient_HeadByNumber_Call) Run(run func(ctx context.Context, n *big.Int)) *FeeEstimatorClient_HeadByNumber_Call {
	_c.Call.Run(func(args mock.Arguments) {
		run(args[0].(context.Context), args[1].(*big.Int))
	})
	return _c
}

func (_c *FeeEstimatorClient_HeadByNumber_Call) Return(_a0 *types.Head, _a1 error) *FeeEstimatorClient_HeadByNumber_Call {
	_c.Call.Return(_a0, _a1)
	return _c
}

func (_c *FeeEstimatorClient_HeadByNumber_Call) RunAndReturn(run func(context.Context, *big.Int) (*types.Head, error)) *FeeEstimatorClient_HeadByNumber_Call {
	_c.Call.Return(run)
	return _c
}

// NewFeeEstimatorClient creates a new instance of FeeEstimatorClient. It also registers a testing interface on the mock and a cleanup function to assert the mocks expectations.
// The first argument is typically a *testing.T value.
func NewFeeEstimatorClient(t interface {
	mock.TestingT
	Cleanup(func())
}) *FeeEstimatorClient {
	mock := &FeeEstimatorClient{}
	mock.Mock.Test(t)

	t.Cleanup(func() { mock.AssertExpectations(t) })

	return mock
}
