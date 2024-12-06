import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Pressable, Alert } from 'react-native';

const Index = () => {
  const [namaProduk, isNamaProduk] = useState('');
  const [hargaProduk, isHargaProduk] = useState('');
  const [produk, isProduk] = useState([]);
  const [totalHarga, isTotalHarga] = useState(0);
  const [tambah, isTambah] = useState(false);
  const [hapus, isHapus] = useState(false);

  const tampilanTambah = () => {
    if(tambah == false) {
      isTambah(true);
    }else{
      isTambah(false);
    }
  }

  const tampilanHapus = () => {
    if(hapus == false) {
      isHapus(true);
    }else{
      isHapus(false);
    }
  }

  const tambahProduk = () => {
    if(namaProduk && hargaProduk){
      const harga = parseInt(hargaProduk);
      isProduk([
        ...produk,
        {id: Date.now(), namaProduk: namaProduk, harga}
        
      ]);
      isTotalHarga(totalHarga+harga);
      isNamaProduk('');
      isHargaProduk('');
      isTambah(false);
    }
  }

  const hapusProduk = (id, harga) => {
    Alert.alert(
      "Konfirmasi",
      "Anda yakin ingin menghapus produk ini?",
      [
        {
          text: "Batal",
          style: "cancel",
        },
        {
          text: "Hapus",
          onPress: () => {
            isProduk(produk.filter((produk) => produk.id !== id));
            isTotalHarga(totalHarga - harga);
          },
          style: "destructive",
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Produk</Text>
        <TouchableOpacity style={styles.addButton} onPress={tampilanTambah}>
          <Text style={styles.addButtonText}>Tambah</Text>
        </TouchableOpacity>
        <Text style={styles.totalPrice}>{totalHarga}</Text>
      </View>
      {
        tambah
        ?<TextInput
          style={styles.input}
          placeholder="Nama"
          value={namaProduk}
          onChangeText={isNamaProduk}
        />
        : null
      }
      {
        tambah
        ?<TextInput
          style={styles.input}
          placeholder="Harga"
          value={hargaProduk}
          keyboardType="numeric"
          onChangeText={isHargaProduk}
        />
        : null
      }
      {
        tambah
        ?<TouchableOpacity style={styles.okButton} onPress={tambahProduk}>
          <Text style={styles.okButtonText}>Oke</Text>
        </TouchableOpacity>
        : null
      }

      <FlatList
        data={produk}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.productItem}>
            <Pressable onPress={tampilanHapus}>
              <Text style={styles.productItem}>
                {item.namaProduk} {item.harga}        
              </Text>
            </Pressable>
            {
              hapus
              ?<TouchableOpacity style={styles.deleteButton} onPress={() => hapusProduk(item.id, item.harga)}>
                <Text style={styles.deleteButtonText}>Hapus</Text>
              </TouchableOpacity>
              : null
            }
          </View> 
        )}
      />
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#6200ee',
    padding: 10,
    borderRadius: 5,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6200ee',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  okButton: {
    alignSelf: 'flex-end',
    backgroundColor: '#6200ee',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  okButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  productText: {
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: '#ff5252',
    padding: 5,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 14,
  },
});


// const Index = () => {
//   const [nama, setNama] = useState("");
//   const [tampil, setTampil] = useState(false);

//   return(
//     <View>
//       <Text>Selamat Datang</Text>
//       <Text>Mobile Legend</Text>
//       <TextInput value={nama} onChangeText={(value) => {
//         setNama(value);
//         if (value == "Budi") {
//           setTampil(true);
//         }else{
//           setTampil(false);
//         }
//       }}
//       placeholder="Masukkan Nama"s
//       />
//       <Text>{nama}</Text>

//       {
//         tampil
//         ? <Text>Nama Anda Siapa?</Text>
//         : null
//       }
//     </View>
//   )
// }

