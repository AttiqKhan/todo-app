import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, Keyboard, TextInput } from 'react-native';

import CheckOnIco from './../assets/svg/check-on-ico.svg';
import CheckOffIco from './../assets/svg/check-off-ico.svg';
import ActionMenuIco from './../assets/svg/action-menu-ico.svg';
import DeleteIco from './../assets/svg/delete-ico.svg';
import EditIco from './../assets/svg/edit-ico.svg';

const HomeScreen = props => {
    const endPoint = 'http://192.168.18.15:3000';
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [todoText, setTodoText] = useState();
    const [isEditing, setIsEditing] = useState(false);

    const addTodo = () => {
        console.log('add todo:' + todoText);
        if (todoText) {
            Keyboard.dismiss();

            setLoading(true);

            fetch(`${endPoint}/api/v1/todo/`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    todo: todoText,
                })
            }).then((json) => {
                getTodos();
                setTodoText(null);
            }).catch((error) => {
                console.error(error);
            });
        }
    }

    const updateTodo = () => {
        setTodoText(null);
        setIsEditing(false);
    }

    const removeTodo = (item) => {
        fetch(`${endPoint}/api/v1/todo/${item._id}`, {
            method: 'DELETE',
        }).then((json) => {
            getTodos();
            setLoading(false);
        })
        .catch((error) => {
            console.error(error);
        });
    };

    const toggleSwitch = async (item) => {
        fetch(`${endPoint}/api/v1/todo/${item._id}`, {
            method: 'PATCH',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                isDone: item.isDone ? false : true,
            })
        });

        setData(data.map(d => {
            if(d._id === item._id) {
                d.isDone = !d.isDone;
            }
            return d;
        }));
    };

    const getTodos = async () => {
        try {
            const response = await fetch(`${endPoint}/api/v1/todo`);
            const json = await response.json();
            setData(json.todos);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getTodos();
    }, []);

    const Item = ({ item }) => (
        <View style={styles.item}>
            <View style={{flexDirection: 'row',alignItems:'center', justifyContent: 'space-between'}}>
                <View style={{flexDirection: 'row',alignItems:'center', flex: 1}}>
                    <TouchableOpacity onPress={() => toggleSwitch(item) }>
                        {
                            item.isDone ? 
                            <CheckOnIco height={30} width={30} /> : 
                            <CheckOffIco height={30} width={30} />
                        }
                    </TouchableOpacity>
                    <Text style={styles.itemTitle}>{item.todo}</Text>
                </View>

                <View style={{flexDirection: 'row',alignItems:'center'}}>
                    <TouchableOpacity onPress={() => {
                        setTodoText(item.todo);
                        setIsEditing(true);
                    }}>
                        <EditIco height={25} width={25} style={{marginRight: 10}} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => removeTodo(item) }>
                        <DeleteIco height={25} width={25} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

    const renderItem = ({ item }) => (
        <Item item={item} />
    );
    return (
        <SafeAreaView style={styles.screen}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Todos List</Text>
            </View>

            <View style={{flexDirection: 'row', alignItems:'center', justifyContent: 'center',paddingHorizontal: 16, paddingBottom: 16}}>
                <TextInput style={styles.input} placeholder={'Add Todo'} value={todoText} onChangeText={text => setTodoText(text)} />
                {
                    isEditing ?
                    <TouchableOpacity onPress={() => {updateTodo()}}>
                        <View style={styles.addWrapper}>
                            <Text style={[styles.addText, {fontSize: 20}]}>Edit</Text>
                        </View>
                    </TouchableOpacity> :
                    <TouchableOpacity onPress={() => addTodo()}>
                        <View style={styles.addWrapper}>
                            <Text style={styles.addText}>+</Text>
                        </View>
                    </TouchableOpacity>
                }
            </View>

            {isLoading ? <ActivityIndicator/> : (
                <FlatList
                    data={data}
                    keyExtractor={({ _id }, index) => _id}
                    renderItem={renderItem}
                    style={styles.list}
                />
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    screen: {
        backgroundColor: '#0093da',
        flex: 1,
        flexDirection: 'column',
        position: 'relative',
    },
    header: {
        height: 120,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: {
        fontSize: 40,
        color: '#fff',
        fontWeight: 'bold',
        marginTop: '10%',
    },
    list: {
        flex: 1,
    },
    item: {
        backgroundColor: '#ffffff',
        padding: 16,
        marginVertical: 6,
        marginHorizontal: 16,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    itemTitle: {
        fontSize: 16,
        color: '#000000',
        marginLeft: 10,
    },
    input: {
        fontSize: 16,
        paddingVertical: 15,
        paddingHorizontal: 24,
        backgroundColor: '#FFF',
        borderRadius: 60,
        height: 60,
        flex: 1,
        marginRight: 10,
    },
    addWrapper: {
        width: 60,
        height: 60,
        backgroundColor: '#f4791f',
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addText: {
        fontSize: 34,
        color: '#fff',
        lineHeight: 39,
    },
});

export default HomeScreen;